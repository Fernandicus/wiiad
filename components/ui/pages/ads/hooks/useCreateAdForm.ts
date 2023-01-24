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
  hasError(formName: keyof AdFormNames): boolean;
  handleSubmit(
    e: FormEvent<HTMLFormElement> | undefined,
    adType: AdType,
    filePreview?: string
  ): void;
  handleChange(e: ChangeEvent<any>): void;
  error(formName: keyof AdFormNames): string;
  isSubmitting: boolean;
}

export const useCreateAdForm = (params: {
  feedback(data: NotificationData): void;
}): IUseCreateAdForm => {
  const { createAd, session } = useAdvertiser();
  const [adType, setAdType] = useState<AdType | null>(null);
  const [filePreview, setFilePreview] = useState<string>();
  const [isSendingAd, setIsSendingAd] = useState(false);

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

  const SignupSchema = Yup.object().shape({
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
    params.feedback({
      message: "Creando anuncio . . .",
      status: "info",
    });
    console.log("values", values);
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
    params.feedback({
      message: "Anuncio creado!",
      status: "success",
    });
    window.location.reload();
  };

  const onSubmit = async (values: IFormNames) => {
    if (isSendingAd) return;
    setIsSendingAd(true);
    await submitAd({
      description: values.description as string,
      segments: values.segments as string[],
      title: values.title as string,
      url: values.url as string,
      file: filePreview!,
    });
    console.log("object");
    setIsSendingAd(false);
  };

  const form = useForm({
    initialValues,
    onSubmit,
    schema: SignupSchema,
  });

  return {
    formNames,
    values: form.formValues as IFormNames,
    handleChange: form.handleFormChange,
    handleSubmit: (
      e: FormEvent<HTMLFormElement> | undefined,
      adType: AdType,
      filePreview: string
    ) => {
      setAdType(adType);
      setFilePreview(filePreview);
      form.handleFormSubmit(e);
    },
    hasError: form.hasError,
    error: form.formError,
    isSubmitting: isSendingAd,
  };
};
