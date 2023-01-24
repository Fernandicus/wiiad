import { ChangeEvent, useState } from "react";

interface IUseFileUploaderProps {
  fileMaxSize: number;
  onSuccess(file: string): void;
}

interface IUseFileUploaderResp {
  errorMessage: string;
  hasError: boolean;
  onSelectFile(event: ChangeEvent<HTMLInputElement>): void;
  filePreview?: string;
}

export const useFileUploader = (
  props: IUseFileUploaderProps
): IUseFileUploaderResp => {
  const { fileMaxSize, onSuccess } = props;
  const mbToBytes = 1000000;
  const mb = Math.floor(fileMaxSize / mbToBytes);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>();

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files![0];

    if (!selectedFile) return;

    if (selectedFile.size > fileMaxSize) {
      setHasError(true);
      setErrorMessage(
        `El archivo es demasiado garnde. El tamaño máximo debe ser ${mb}Mb`
      );
    } else {
      if (hasError) setHasError(false);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const fileResult = reader.result as string;
        setFilePreview(fileResult);
        onSuccess(fileResult);
      };
    }
  };

  return {
    errorMessage,
    hasError,
    onSelectFile,
    filePreview,
  };
};
