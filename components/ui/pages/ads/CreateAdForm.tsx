import React, { useState } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { CloudinaryUploader } from "../../../src/cloudinary/CloudinaryUploader";
import { useFormik } from "formik";
import { SelectFile } from "./ad-form-items/SelectFile";
import { AdSegmentsComponent } from "./ad-form-items/AdSegmentsComponent";
import { SubmitButton } from "./ad-form-items/SubmitButton";
import * as Yup from "yup";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { UniqId } from "@/src/utils/UniqId";
import { useCreateAdForm } from "./hooks/useCreateAdForm";

export default function CreateAdForm(props: {
  user: IUserPrimitives;
  adType: AdType;
  handleResponse(data: NotificationData): void;
}) {
  const {
    formNames,
    handleChange,
    handleSubmit,
    values,
    hasError,
    error,
    isSubmitting,
  } = useCreateAdForm({
    feedback: props.handleResponse,
  });
  const [isFileOk, setIsFileOk] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>();
  //const [hasErrors, setHasErrors] = useState(false);

  return (
    <form
      className="w-full space-y-5"
      onSubmit={(e) => handleSubmit(e, props.adType, filePreview)}
    >
      <SelectFile
        inputName={formNames.file}
        adType={props.adType}
        filePreview={filePreview}
        onSelectFile={(image) => setFilePreview(image)}
        onSuccess={() => {
          setIsFileOk(true);
        }}
      />
      <AdSegmentsComponent
        inputName={formNames.segments}
        onChange={handleChange}
        segmentsSelected={values.segments}
      />
      {values.segments.length > 3 ? (
        <span className="text-xs text-red-500">{error("segments")}</span>
      ) : hasError("segments") ? (
        <span className="text-xs text-red-500">{error("segments")}</span>
      ) : null}
      <div className="space-y-2">
        <label className="font-bold">
          Titulo{" "}
          <span className="font-medium text-sm text-gray-500">
            ({values.title.length}/{AdTitle.maxLength})
          </span>
        </label>
        <input
          required
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={values.title}
          name={formNames.title}
          maxLength={AdTitle.maxLength}
          className={`rounded-md px-2 block w-full h-10 border ${"border-gray-300"} `}
        />
        {hasError("title") ? (
          <span className="text-xs text-red-500">{error("title")}</span>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="font-bold">URL de redirección</label>
        <input
          required
          type="text"
          placeholder="https://..."
          onChange={handleChange}
          value={values.url}
          name={formNames.url}
          className="border border-gray-300 rounded-md px-2 block w-full h-10"
        />
        {hasError("url") ? (
          <span className="text-xs text-red-500">{error("url")}</span>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="font-bold">
          Descripcion{" "}
          <span className="font-medium text-sm text-gray-500">
            ({values.description.length}/{AdDescription.maxLength})
          </span>
        </label>
        <textarea
          required
          placeholder="Description"
          rows={4}
          onChange={handleChange}
          value={values.description}
          name={formNames.description}
          className="p-2 border border-gray-300 rounded-md px-2 block w-full"
        ></textarea>
        {hasError("description") ? (
          <span className="text-xs text-red-500">{error("description")}</span>
        ) : null}
      </div>
      <div className="flex justify-end">
        <SubmitButton
          label="Crear anuncio"
          isFile={isFileOk}
          isSendingAd={isSubmitting}
        />
      </div>
    </form>
  );
}
