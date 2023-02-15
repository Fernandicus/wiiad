import { useForm } from "../../../ads/hooks/useForm";
import * as Yup from "yup";

export interface IUpdatePofileForm {
  email: string;
  name: string;
  profilePic: string;
}

export const useUpdateProfileDataForm = (props: IUpdatePofileForm) => {
  const a = async () => {};
  const form = useForm({
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
        .min(3, "Demasiado corto"),
      profilePic: Yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (params) => {
      //TODO: fetch update profile data
      if (params.profilePic !== props.profilePic)
      
      console.log(params);
    },
    /* onSubmit: (params) => {
      console.log(params);
    }, */
  });

  return form;
};
