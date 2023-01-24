import { useFormik } from "formik";
import { ChangeEvent, FormEvent } from "react";

interface IUseForm<T extends object> {
  initialValues: Record<keyof T, any>;
  schema: any;
  onSubmit(values: T): void;
}

interface IUseCreateAdForm<T, S> {
  formValues: S;
  handleFormChange(e: ChangeEvent<any>): void;
  handleFormSubmit(e: FormEvent<HTMLFormElement> | undefined): void;
  hasError(formName: keyof T): boolean;
  formError(formName: keyof T): string;
}

export const useForm = <T extends object, S>(
  params: IUseForm<T>
): IUseCreateAdForm<T, S> => {
  const initialValues = params.initialValues;
  const formik = useFormik({
    initialValues,
    validationSchema: params.schema,
    onSubmit: (values) => {
      params.onSubmit(values);
    },
  });

  return {
    formValues: formik.values as S,
    handleFormChange: formik.handleChange,
    handleFormSubmit: formik.handleSubmit,
    hasError: (formName: keyof T) => {
      return formik.errors[formName] && formik.touched[formName] ? true : false;
    },
    formError: (formName: keyof T) => formik.errors[formName] as string,
  };
};
