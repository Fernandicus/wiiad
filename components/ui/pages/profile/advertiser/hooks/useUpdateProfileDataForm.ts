import { useForm } from "../../../ads/hooks/useForm";
import * as Yup from "yup";
import { uploadFileToCloudHandler } from "@/components/src/cloud-file-store/infrastructure/cloud-file-store-container";
import { useState } from "react";
import { IApiReqUpdateProfile } from "@/pages/api/v1/profile/update";
import { useRouter } from "next/router";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { UpdateAdvertiserProfController } from "@/components/src/advertiser/data-profile/infrastructure/controllers/UpdateAdvertiserProfileController";
import { useNotification } from "@/components/hooks/useNotification";

interface IInputValues {
  email: string;
  name: string;
  profilePic: string;
}

export const useUpdateProfileDataForm = (props: IInputValues) => {
  const { setNotification } = useNotification();
  const [file, setFile] = useState("");
  const router = useRouter();

  const form = useForm<IInputValues, { file?: string }>({
    initialValues: props,
    inputNames: {
      email: "email",
      name: "name",
      profilePic: "profilePic",
    },
    yupSchema: Yup.object().shape({
      email: Yup.string()
        .required("Campo obligatorio")
        .email("El email no es válido"),
      name: Yup.string()
        .required("Campo obligatorio")
        .min(3, "Demasiado corto")
        .max(25),
      profilePic: Yup.string().required("Campo obligatorio"),
    }),
    onSubmit: (params) => {
      if (params.file) setFile(params.file);
    },
    handleSubmit: async (params) => {
      const controller = new UpdateAdvertiserProfController();
      await controller.update({
        ...params,
        profilePic: file,
      });

      if (params.email.toLowerCase() !== props.email.toLowerCase()) {
        setNotification({
          message: "Te hemos enviado un email de verificación",
          status: "success",
        });
      } else {
        setNotification({
          message: "Tu perfil ha sido actualizado",
          status: "success",
        });
      }
      router.reload();
    },
  });

  return form;
};
