import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TFormNames<T> = { [K in keyof T]: string };

export interface IUseForm<FV, T> {
  input: { names: TFormNames<FV>; values: FV };
  handle: {
    submit(e: FormEvent<HTMLFormElement> | undefined, params: T): void;
    change(e: ChangeEvent<any>): void;
  };
  error: {
    message(name: keyof FV): string;
    hasError(name: keyof FV): boolean;
  };
  isSubmitting: boolean;
}

interface IUseFormProps<T, P> {
  inputNames: TFormNames<T>;
  initialValues: T;
  yupSchema: {};
  handleSubmit(values: T): void | Promise<void>;
  onSubmit?(params: P): void;
}

export const useForm = <T extends object, P>({
  initialValues,
  yupSchema,
  handleSubmit,
  onSubmit,
  inputNames,
}: IUseFormProps<T, P>): IUseForm<T, P> => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
      setIsSubmitting(false);
    },
  });

  return {
    input: { names: inputNames, values: form.values },
    handle: {
      change: form.handleChange,
      submit: (e, params) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        if (onSubmit) onSubmit(params);
        form.handleSubmit(e);
      },
    },
    error: {
      hasError: (name) =>
        form.errors[name] && form.touched[name] ? true : false,
      message: (name) => form.errors[name] as string,
    },
    isSubmitting,
  };
};
