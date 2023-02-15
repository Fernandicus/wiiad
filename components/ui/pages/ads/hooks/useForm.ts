import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TFormNames<T> = { [K in keyof T]: string };

export interface IUseForm<FV> {
  input: { names: TFormNames<FV>; values: FV };
  handle: {
    submit<T>(e: FormEvent<HTMLFormElement> | undefined, params?: T): void;
    change(e: ChangeEvent<any>): void;
  };
  error: {
    message(name: keyof FV): string;
    hasError(name: keyof FV): boolean;
  };
}

export const useForm = <T extends object>({
  initialValues,
  yupSchema,
  //handleSubmit,
  onSubmit,
  inputNames,
}: {
  inputNames: TFormNames<T>;
  initialValues: T;
  yupSchema: {};
  onSubmit(values: T): void;
  //onSubmit<P>(params?: P): void;
}): IUseForm<T> => {
  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yupSchema,
    onSubmit,
  });

  return {
    input: { names: inputNames, values: form.values },
    handle: {
      change: form.handleChange,
      submit: (e, params) => {
        //  onSubmit(params);
        form.handleSubmit(e);
      },
    },
    error: {
      hasError: (name) =>
        form.errors[name] && form.touched[name] ? true : false,
      message: (name) => form.errors[name] as string,
    },
    //isSubmitting: isLoading,
  };
};
