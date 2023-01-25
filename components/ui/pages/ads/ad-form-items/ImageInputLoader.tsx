import { UploadIcon } from "@/components/ui/icons/UploadIcon";
import { ChangeEvent } from "react";

interface IImageInputLoaderProps {
  children: JSX.Element | JSX.Element[];
  filePreview?: string;
  inputName?: string;
  onSelectFile(event: ChangeEvent<HTMLInputElement>): void;
  imageClassName: string;
}

export const ImageInputLoader = (params: IImageInputLoaderProps) => {
  const { imageClassName, filePreview, inputName, onSelectFile, children } =
    params;
  const idRef = "image-input";

  return (
    <div className="relative">
      <label htmlFor={idRef}>
        {filePreview ? (
          <div className="bg-white">
            <img
              src={filePreview.toString()}
              alt="image-uploaded"
              className={`hover:cursor-pointer ${imageClassName}`}
            ></img>
          </div>
        ) : (
          children
        )}
      </label>
      <input
        className="hidden"
        required
        id={idRef}
        accept=".png, .jpg, .jpeg"
        type="file"
        name={inputName}
        onChange={onSelectFile}
      />
    </div>
  );
};
