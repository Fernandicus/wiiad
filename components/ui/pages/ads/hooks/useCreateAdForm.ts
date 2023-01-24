import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { CloudinaryUploader } from "@/components/src/cloudinary/CloudinaryUploader";
import { NotificationData } from "@/components/ui/notifications/Notifications";
import { AdType } from "@/pages/ads";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { UniqId } from "@/src/utils/UniqId";
import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useState } from "react";
import * as Yup from "yup";
import { useForm } from "../../../../hooks/useForm";

interface IFormNames {
  file: string;
  title: string;
  url: string;
  segments: string[];
  description: string;
}

interface AdFormNames {
  file: string;
  title: string;
  url: string;
  segments: string;
  description: string;
}

interface IUseCreateAdForm {
  formNames: AdFormNames;
  values: IFormNames;
  handle: {
    submit(
      e: FormEvent<HTMLFormElement> | undefined,
      params: { adType: AdType; filePreview?: string }
    ): void;
    change(e: ChangeEvent<any>): void;
  };
  error: {
    message(formName: keyof AdFormNames): string;
    hasError(formName: keyof AdFormNames): boolean;
  };
  isSubmitting: boolean;
}

interface IUseCreateAdFormProps {
  handleResponse(data: NotificationData): void;
  onSuccess(): void;
}

export const useCreateAdForm = (
  params: IUseCreateAdFormProps
): IUseCreateAdForm => {
  const { createAd, session } = useAdvertiser();
  const [adType, setAdType] = useState<AdType | null>(null);
  const [filePreview, setFilePreview] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Campo obligatorio")
      .min(3, "Demasiado corto")
      .max(AdTitle.maxLength, "Demasiado largo"),
    url: Yup.string()
      .required("Campo obligatorio")
      .url("Debe ser una url válida"),
    segments: Yup.array()
      .min(3, "Debes elegir 3 segmentos de anuncio")
      .max(3, "Sólo puedes elegir 3 segmentos de anuncio")
      .required("Campo obligatorio"),
    description: Yup.string()
      .required("Campo obligatorio")
      .min(10, "Demasiado corta")
      .max(AdDescription.maxLength, "Demasiado larga"),
  });
  const formNames: AdFormNames = {
    file: "file",
    title: "title",
    url: "url",
    segments: "segments",
    description: "description",
  };
  const initialValues: Record<keyof AdFormNames, string | string[]> = {
    file: "",
    description: "",
    segments: [],
    title: "",
    url: "",
  };

  const form = useForm({ initialValues, schema, onSubmit: onHandleSubmit });

  const uploadFile = async (): Promise<string> => {
    const cloudinaryVideoUploader = new CloudinaryUploader();

    if (!filePreview) throw new Error("Debes seleccionar un archivo");

    if (adType === "video")
      return await cloudinaryVideoUploader.uploadVideo(filePreview);
    else if (adType === "banner")
      return await cloudinaryVideoUploader.uploadBanner(filePreview);
    else throw new Error("El tipo de anuncio seleccionado no existe");
  };

  const submitAd = async (values: IFormNames) => {
    if (!filePreview) return;
    params.handleResponse({
      message: "Creando anuncio . . .",
      status: "info",
    });
    let fileUrl = await uploadFile();
    const formData: IFormNames = {
      ...values,
      file: fileUrl,
    };
    await createAd({
      id: UniqId.generate(),
      advertiserId: session.id,
      title: formData.title,
      description: formData.description,
      file: fileUrl,
      redirectionUrl: formData.url,
      segments: formData.segments,
    });
    params.handleResponse({
      message: "Anuncio creado!",
      status: "success",
    });
    params.onSuccess();
  };

  async function onHandleSubmit(values: IFormNames) {
    if (isLoading) return;
    setIsLoading(true);
    await submitAd({
      description: values.description as string,
      segments: values.segments as string[],
      title: values.title as string,
      url: values.url as string,
      file: filePreview!,
    });
    setIsLoading(false);
  }

  return {
    formNames,
    values: form.formValues as IFormNames,
    handle: {
      change: form.handleFormChange,
      submit: (e, params) => {
        setAdType(params.adType);
        setFilePreview(params.filePreview);
        form.handleFormSubmit(e);
      },
    },
    error: {
      hasError: form.hasError,
      message: form.formError,
    },
    isSubmitting: isLoading,
  };
};
