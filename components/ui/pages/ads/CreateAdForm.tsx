import React, { useState } from "react";
import { NotificationData } from "../../notifications/Notifications";
import { AdType } from "@/pages/ads";
import { SelectFileField } from "./ad-form-items/SelectFileField";
import { AdSegmentsField } from "./ad-form-items/AdSegmentsField";
import { useCreateAdForm } from "./hooks/useCreateAdForm";
import { AdTitleField } from "./ad-form-items/AdTitleField";
import { AdURLField } from "./ad-form-items/AdURLField";
import { AdDescriptionField } from "./ad-form-items/AdDescriptionField";
import { PrimaryButton } from "../../buttons/PrimaryButton";

interface ICreateAdFormProps {
  adType: AdType;
  handleResponse(data: NotificationData): void;
  onSuccess(): void;
}

export default function CreateAdForm(props: ICreateAdFormProps) {
  const { adType, handleResponse, onSuccess } = props;
  const { formNames, handle, values, error, isSubmitting } = useCreateAdForm({
    handleResponse,
    onSuccess,
  });
  const [isFileOk, setIsFileOk] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>();

  return (
    <form
      className="w-full space-y-5 pt-5"
      onSubmit={(e) => {
        const submitParams = { adType, filePreview };
        handle.submit(e, submitParams);
      }}
    >
      <SelectFileField
        inputName={formNames.file}
        adType={adType}
        onSuccess={(image) => {
          setFilePreview(image);
          setIsFileOk(true);
        }}
      />
      <AdSegmentsField
        title="A qué nichos va dirigido este anuncio?"
        inputName={formNames.segments}
        onChange={handle.change}
        value={values.segments}
        errorText={error.message("segments")}
        hasError={error.hasError("segments")}
      />
      <AdTitleField
        title="Título"
        value={values.title}
        onChange={handle.change}
        inputName={formNames.title}
        hasError={error.hasError("title")}
        errorText={error.message("title")}
      />
      <AdURLField
        hasError={error.hasError("url")}
        inputName={formNames.url}
        onChange={handle.change}
        title="URL de redirección"
        errorText={error.message("url")}
        value={values.url}
      />
      <AdDescriptionField
        hasError={error.hasError("description")}
        inputName={formNames.description}
        onChange={handle.change}
        title="Description"
        value={values.description}
        errorText={error.message("description")}
      />
      <PrimaryButton
        isLoading={isSubmitting}
        disabled={isFileOk ? false : true}
      >
        Crear anuncio
      </PrimaryButton>
    </form>
  );
}
