import { useAds } from "@/components/hooks/advertiser/ads/useAds";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { uploadFileToCloudHandler } from "@/components/src/cloud-file-store/infrastructure/cloud-file-store-container";
import { useNotification } from "@/components/hooks/useNotification";
import { AdType } from "@/pages/ads";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { UniqId } from "@/src/utils/UniqId";
import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useState } from "react";
import * as Yup from "yup";

interface IFormNames {
  file: string;
  title: string;
  url: string;
  segments: string[];
  description: string;
}

enum AdFormNames {
  file = "file",
  title = "title",
  url = "url",
  segments = "segments",
  description = "description",
}

interface IUseCreateAdForm {
  names: typeof AdFormNames;
  values: IFormNames;
  handle: {
    submit(
      e: FormEvent<HTMLFormElement> | undefined,
      params: { adType: AdType; filePreview?: string }
    ): void;
    change(e: ChangeEvent<any>): void;
  };
  error: {
    message(name: keyof typeof AdFormNames): string;
    hasError(name: keyof typeof AdFormNames): boolean;
  };
  isSubmitting: boolean;
}

interface IUseCreateAdFormProps {
  onSuccess(): void;
}

export const useCreateAdForm = (
  params: IUseCreateAdFormProps
): IUseCreateAdForm => {
  const { setNotification } = useNotification();
  const { session } = useAdvertiser();
  const { createAd } = useAds();
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
  const formNames = AdFormNames;

  const initialValues: IFormNames = {
    file: "",
    description: "",
    segments: [],
    title: "",
    url: "",
  };

  const form = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      onHandleSubmit(values);
    },
  });

  const uploadFile = async (): Promise<string> => {
    if (!filePreview) throw new Error("Debes seleccionar un archivo");

    if (adType === "video")
      return await uploadFileToCloudHandler.video(filePreview);
    else if (adType === "banner")
      return await uploadFileToCloudHandler.banner(filePreview);
    else throw new Error("El tipo de anuncio seleccionado no existe");
  };

  const submitAd = async (values: IFormNames) => {
    if (!filePreview) return;
    setNotification({ message: "Creando anuncio . . .", status: "info" });
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
    setNotification({ message: "Anuncio creado!", status: "success" });
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
    names: formNames,
    values: form.values,
    handle: {
      change: form.handleChange,
      submit: (e, params) => {
        setAdType(params.adType);
        setFilePreview(params.filePreview);
        form.handleSubmit(e);
      },
    },
    error: {
      hasError: (name) =>
        form.errors[name] && form.touched[name] ? true : false,
      message: (name) => form.errors[name] as string,
    },
    isSubmitting: isLoading,
  };
};
