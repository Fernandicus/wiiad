import { useForm } from "../../../ads/hooks/useForm";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { UpdateAdvertiserProfController } from "@/components/src/advertiser/data-profile/infrastructure/controllers/UpdateAdvertiserProfileController";
import { useNotification } from "@/components/hooks/useNotification";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";

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
      const handleRole = new HandleRolesHandler(user.role);

      await handleRole.forRole({
        BUSINESS: async () => {
          const controller = new UpdateAdvertiserProfController();
          await controller.update({
            ...params,
            profilePic: file,
          });
        },
        USER: () => {
          throw new Error("No handler provided for role user");
        },
        AGENCY: () => {
          throw new Error("No handler provided for role agency");
        },
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
    },
  });

  return form;
};
