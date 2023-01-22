import { SelectImage } from "./ad-form-items/SelectImage";
import { SelectVideo } from "./ad-form-items/SelectVideo";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import React, { FormEvent, useRef, useState } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { LoadingSpinnerAnimation } from "../../icons/LoadingSpinnerAnimation";
import { CloudinaryUploader } from "../../../src/cloudinary/CloudinaryUploader";
import { BackButton } from "../../icons/BackButton";
import { AdSegmentType } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { FormikConfig, useFormik } from "formik";
import { SelectFile } from "./ad-form-items/SelectFile";
import { AdSegmentsComponent } from "./ad-form-items/AdSegmentsComponent";
import { SubmitButton } from "./ad-form-items/SubmitButton";
import * as Yup from "yup";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

interface FormNames {
  file: string;
  title: string;
  url: string;
  segments: string[];
  description: string;
}

export default function CreateAdForm(props: {
  user: IUserPrimitives;
  createAd: AdType;
  onBack(): void;
  handleResponse: (data: NotificationData) => void;
}) {
  const [isFileOk, setIsFileOk] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSendingAd, setIsSendingAd] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const formNames = {
    file: "file",
    title: "title",
    url: "url",
    segments: "segments",
    description: "description",
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

  const saveAd = async (params: { values: FormNames; apiRoute: string }) => {
    const { values, apiRoute } = params;
    try {
      const resp = await fetch(apiRoute, {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          file: values.file,
          redirectionUrl: values.url,
          segments: values.segments,
        }),
      });

      if (resp.status === 200) {
        props.handleResponse({
          message: "Anuncio creado!",
          status: "success",
        });
        window.location.reload();
      } else {
        const respJSON = await resp.json();
        props.handleResponse({
          message: respJSON["info"],
          status: "error",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          props.handleResponse({
            message: "Desactiva el bloqueador de anuncios",
            status: "error",
          });
        } else {
          props.handleResponse({
            message: err.message,
            status: "error",
          });
        }
      }
    }
  };

  const uploadFile = async (): Promise<string> => {
    const cloudinaryVideoUploader = new CloudinaryUploader();
    const adType = props.createAd;

    if (!filePreview) throw new Error("Debes seleccionar un archivo");

    if (adType === "video")
      return await cloudinaryVideoUploader.uploadVideo(filePreview);
    else if (adType === "banner")
      return await cloudinaryVideoUploader.uploadBanner(filePreview);
    else throw new Error("El tipo de anuncio seleccionado no existe");
  };

  const submitAd = async (values: FormNames) => {
    if (!filePreview) return;
    props.handleResponse({
      message: "Creando anuncio . . .",
      status: "info",
    });

    let fileUrl = await uploadFile();
    const formData: FormNames = {
      ...values,
      file: fileUrl,
    };
    await saveAd({ values: formData, apiRoute: ApiRoutes.createBannerAd });
  };

  const formik = useFormik({
    initialValues: {
      file: "",
      title: "",
      url: "",
      segments: [],
      description: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      if (isSendingAd) return;
      setIsSendingAd(true);
      /* console.log({ ...values, file: filePreview!.slice(0, 40) + "..." });
      console.log("FILE", filePreview?.slice(0, 40) + "..."); */
      await submitAd({ ...values, file: filePreview! });
      setIsSendingAd(false);
    },
  });

  return (
    <div className="max-w-xl w-full py-10">
      <div className="pb-5">
        <button
          onClick={props.onBack}
          className="w-6 h-auto hover:text-sky-500"
        >
          <BackButton />
        </button>
        <div className="font-bold text-xl  ">Crea tu anuncio</div>
      </div>
      <form className="w-full space-y-5" onSubmit={formik.handleSubmit}>
        <SelectFile
          inputName={formNames.file}
          adType={props.createAd}
          filePreview={filePreview}
          onSelectFile={(image) => setFilePreview(image)}
          onSuccess={() => {
            setIsFileOk(true);
          }}
        />
        <AdSegmentsComponent
          inputName={formNames.segments}
          onChange={formik.handleChange}
          segmentsSelected={formik.values.segments}
        />
        {formik.values.segments.length > 3 ? (
          <span className="text-xs text-red-500">{formik.errors.segments}</span>
        ) : formik.errors.segments && formik.touched.segments ? (
          <span className="text-xs text-red-500">{formik.errors.segments}</span>
        ) : null}
        <div className="space-y-2">
          <label className="font-bold">
            Titulo{" "}
            <span className="font-medium text-sm text-gray-500">
              ({formik.values.title.length}/{AdTitle.maxLength})
            </span>
          </label>
          <input
            required
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            name={formNames.title}
            maxLength={AdTitle.maxLength}
            className={`rounded-md px-2 block w-full h-10 border ${"border-gray-300"} `}
          />
          {formik.errors.title && formik.touched.title ? (
            <span className="text-xs text-red-500">{formik.errors.title}</span>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="font-bold">URL de redirección</label>
          <input
            required
            type="text"
            placeholder="https://..."
            onChange={formik.handleChange}
            value={formik.values.url}
            name={formNames.url}
            className="border border-gray-300 rounded-md px-2 block w-full h-10"
          />
          {formik.errors.url && formik.touched.url ? (
            <span className="text-xs text-red-500">{formik.errors.url}</span>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="font-bold">
            Descripcion{" "}
            <span className="font-medium text-sm text-gray-500">
              ({formik.values.description.length}/{AdDescription.maxLength})
            </span>
          </label>
          <textarea
            required
            placeholder="Description"
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.description}
            name={formNames.description}
            className="p-2 border border-gray-300 rounded-md px-2 block w-full"
          ></textarea>
          {formik.errors.description && formik.touched.description ? (
            <span className="text-xs text-red-500">
              {formik.errors.description}
            </span>
          ) : null}
        </div>
        <div className="flex justify-end">
          <SubmitButton
            label="Crear anuncio"
            isFile={isFileOk}
            isSendingAd={isSendingAd}
          />
        </div>
      </form>
    </div>
  );
}
