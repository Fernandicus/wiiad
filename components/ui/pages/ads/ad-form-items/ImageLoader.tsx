import { UploadIcon } from "@/components/ui/icons/UploadIcon";
import { ChangeEvent } from "react";
import { ImageInputLoader } from "./ImageInputLoader";

interface IImageLoaderProps {
  onSelectImage(event: ChangeEvent<HTMLInputElement>): void;
  imagePreview?: string;
  inputName?: string;
}

export const ImageLoader = (params: IImageLoaderProps) => {
  const { onSelectImage, imagePreview, inputName } = params;

  return (
    <ImageInputLoader
      onSelectFile={onSelectImage}
      filePreview={imagePreview}
      inputName={inputName}
      imageClassName="w-[576px] h-[324px] hover:opacity-60 transition duration-150 ease-in object-cover bg-white rounded-lg"
    >
      <div className="group flex items-center justify-center hover:cursor-pointer w-[576px] h-[324px] bg-white rounded-lg border border-gray-400 border-dashed ">
        <div className="text-gray-400 group-hover:text-gray-500 transition duration-100 ease-in">
          <div className="w-full h-6 text-center group-hover:stroke-gray-500 stroke-gray-400 transition duration-100 ease-in">
            <UploadIcon />
          </div>
          <p className=" font-medium">Sube una imagen</p>
        </div>
      </div>
    </ImageInputLoader>
  );
};
