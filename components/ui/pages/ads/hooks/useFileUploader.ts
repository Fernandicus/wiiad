import { ChangeEvent, useState } from "react";

type Ev = ChangeEvent<HTMLInputElement>;

interface IUseFileUploaderProps {
  fileMaxSize: number;
  onSuccess?(file: string): void;
}

interface IUseFileUploaderResp {
  errorMessage: string;
  hasError: boolean;
  onSelectFile(event: ChangeEvent<HTMLInputElement>): void;
  filePreview?: string;
  resetFile(): void;
}

/**
 * @param fileMaxSize must be in bytes. (2mb = 2 * 1024 * 1024 bytes)
 */
export const useFileUploader = (
  props: IUseFileUploaderProps
): IUseFileUploaderResp => {
  const { fileMaxSize, onSuccess } = props;
  const mbToBytes = 1000000;
  const mb = Math.floor(fileMaxSize / mbToBytes);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const selectedFile = event.target.files![0];

    if (!selectedFile) return;

    if (selectedFile.size > fileMaxSize) {
      setHasError(true);
      setErrorMessage(
        `El archivo es demasiado grande. El tamaño máximo debe ser ${mb}Mb`
      );
    } else {
      if (hasError) setHasError(false);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const fileResult = reader.result as string;
        setFilePreview(fileResult);
        if (onSuccess) onSuccess(fileResult);
      };
    }
  };

  return {
    errorMessage,
    hasError,
    onSelectFile,
    filePreview,
    resetFile: () => setFilePreview(undefined),
  };
};
