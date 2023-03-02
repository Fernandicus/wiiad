
import { useFileUploader } from "../hooks/useFileUploader";
import { ErrorLabel } from "./ErrorLabel";
import { ImageLoader } from "./ImageLoader";
import { TitleWithDescriptionLabel } from "./TitleWithDescriptionLabel";

interface Props {
  onSuccess(file: string): void;
  inputName: string;
}

export function SelectImage(props: Props) {
  const { onSuccess, inputName } = props;
  const fileMaxSize = 1020 * 1020;
  const mbToBytes = 1000000;
  const mb = Math.floor(fileMaxSize / mbToBytes);
  const fileUploader = useFileUploader({ fileMaxSize, onSuccess });

  return (
    <div className="space-y-2">
      <TitleWithDescriptionLabel
        title="Sube una imagen (16:9)"
        description={`Tamaño máximo ${mb}Mb y dimensiones de 576x324 `}
      />
      <ImageLoader
        inputName={inputName}
        imagePreview={fileUploader.filePreview}
        onSelectImage={fileUploader.onSelectFile}
      />
      {fileUploader.hasError && (
        <ErrorLabel errorText={fileUploader.errorMessage} />
      )}
    </div>
  );
}
