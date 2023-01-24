import React, { useState } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { SelectFile } from "./ad-form-items/SelectFile";
import { AdSegmentsField } from "./ad-form-items/AdSegmentsField";
import { SubmitButton } from "./ad-form-items/SubmitButton";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useCreateAdForm } from "./hooks/useCreateAdForm";
import { AdTitleField } from "./ad-form-items/AdTitleField";
import { AdURLField } from "./ad-form-items/AdURLField";
import { AdDescriptionField } from "./ad-form-items/AdDescriptionField";

interface ICreateAdFormProps {
  adType: AdType;
  handleResponse(data: NotificationData): void;
  onSuccess(): void;
}

export default function CreateAdForm(props: ICreateAdFormProps) {
  const { adType, handleResponse, onSuccess } = props;
  const {
    formNames,
    handleChange,
    handleSubmit,
    values,
    hasError,
    error,
    isSubmitting,
  } = useCreateAdForm({
    handleResponse,
    onSuccess,
  });
  const [isFileOk, setIsFileOk] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>();

  return (
    <form
      className="w-full space-y-5"
      onSubmit={(e) => {
        const submitParams = { adType, filePreview };
        handleSubmit(e, submitParams);
      }}
    >
      <SelectFile
        inputName={formNames.file}
        adType={adType}
        filePreview={filePreview}
        onSelectFile={(image) => setFilePreview(image)}
        onSuccess={() => {
          setIsFileOk(true);
        }}
      />
      <AdSegmentsField
        title="A qué nichos va dirigido este anuncio?"
        inputName={formNames.segments}
        onChange={handleChange}
        value={values.segments}
        errorText={error("segments")}
        hasError={hasError("segments")}
      />
      <AdTitleField
        title="Título"
        value={values.title}
        onChange={handleChange}
        inputName={formNames.title}
        hasError={hasError("title")}
        errorText={error("title")}
      />
      <AdURLField
        hasError={hasError("url")}
        inputName={formNames.url}
        onChange={handleChange}
        title="URL de redirección"
        errorText={error("url")}
        value={values.url}
      />
      <AdDescriptionField
        hasError={hasError("description")}
        inputName={formNames.description}
        onChange={handleChange}
        title="Description"
        value={values.description}
        errorText={error("description")}
      />
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
