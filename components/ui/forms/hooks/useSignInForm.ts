import { RoleType } from "@/src/common/domain/Role";
import { useForm } from "../../pages/ads/hooks/useForm";
import * as Yup from "yup";
import { SubmitSignInController } from "@/components/src/sing-in/infrastructure/controllers/SubmitSignInController";
import { useState } from "react";

type TSingInValues = {
  userName: string;
  email: string;
};

export const useSignInForm = (props: {
  newAccount: boolean;
  userRole: RoleType;
  onSuccess(): void;
  onError(error: Error): void;
}) => {

  const newAccountSchema = Yup.object().shape({
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    userName: Yup.string()
      .min(3, "Demasiado corto")
      .max(25)
     .required("Campo obligatorio"),
  });

  const existingAccountSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo obligatorio")
      .email("El email no es válido"),
    userName: Yup.string().min(3, "Demasiado corto").max(25),
  });

  const form = useForm({
    inputNames: {
      userName: "userName",
      email: "email",
    },
    initialValues: {
      email: "",
      userName: "",
    },
    yupSchema: props.newAccount ? newAccountSchema : existingAccountSchema,
    handleSubmit: async (values) => {
      try {
        await sumbitCreateNewUser(values);
        props.onSuccess();
      } catch (err) {
        if (err instanceof Error) props.onError(err);
      }
    },
  });

  const signIn = async (data: {
    role: RoleType;
    email: string;
    userName?: string;
  }): Promise<void> => {
    const { email, role, userName } = data;
    const submitForm = new SubmitSignInController();
    if (props.newAccount) {
      await submitForm.singUp({
        role,
        email,
        userName: userName!,
      });
    } else {
      await submitForm.logIn({
        role,
        email,
      });
    }
  };

  const sumbitCreateNewUser = async (values: TSingInValues): Promise<void> => {
    const email = values.email;
    const userName = values.userName;
    if (!email) return;
    await signIn({ role: props.userRole, userName, email });
  };

  return form;
};
