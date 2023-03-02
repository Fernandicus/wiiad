import { useForm } from "../../../ads/hooks/useForm";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { UpdateProfileController } from "@/components/src/advertiser/data-profile/infrastructure/controllers/UpdateProfileController";
import { useNotification } from "@/components/hooks/useNotification";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

type ProfileValues = {
  email: string;
  name: string;
  profilePic: string;
};

export const useUpdateProfileDataForm = (user: IUserPrimitives) => {
  const { setNotification } = useNotification();
  const [file, setFile] = useState("");
  const router = useRouter();

  const form = useForm<ProfileValues, { file?: string }>({
    initialValues: { ...user },
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
      const controller = new UpdateProfileController();
      try {
        await controller.update({
          ...params,
          profilePic: file,
        });

        if (params.email.toLowerCase() !== user.email.toLowerCase()) {
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
      } catch (err) {
        setNotification({
          message: "No se pudo actualizar el perfil",
          status: "error",
        });
      }
    },
  });

  return form;
};
