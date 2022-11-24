import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  onSelectImage(image: string | null): void;
  imagePreview: string | null;
  onSuccess(): void;
  inputName:string,
}

export function SelectImage({ onSelectImage, imagePreview, onSuccess, inputName }: Props) {
  const maxSize = 1020 * 1020;
  const [errorLoadingMessage, setErrorLoading] = useState<string | null>();

  const onLoadFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];

    if (file.size > maxSize) {
      setErrorLoading("El archivo es demasiado garnde, intenta comprimirlo");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {

        const res = reader.result as string
        onSelectImage(res);
      };
      onSuccess();
    }
  };

  return (
    <div className="space-y-5">
      <label className="font-bold">
        Sube una imagen{" "}
        <span
          className={
            errorLoadingMessage
              ? "text-sm text-red-500 font-medium"
              : "text-sm text-gray-500 font-medium"
          }
        >
          576x324 [16:9] y maximo 1Mb
        </span>
      </label>
      <div>
        {imagePreview ? (
          <img
            src={imagePreview.toString()}
            alt="alt"
            className="w-[576px] h-[324px] object-cover  bg-white rounded-lg"
          ></img>
        ) : (
          <img
            className="w-[576px] h-[324px] object-cover bg-white rounded-lg"
            src="https://images.unsplash.com/photo-1591254460606-fab865bf82b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
          ></img>
        )}
      </div>
      <input
        required
        className="hover:file:bg-sky-400 file:bg-sky-500 file:rounded-l-lg file:rounded-r-sm file:border-none file:h-full file:text-white file:mr-5 file:px-2 hover:file:cursor-pointer block w-full text-sm text-gray-900 bg-white rounded-lg border h-10 border-gray-300 cursor-pointer"
        id="file_input"
        accept=".png, .jpg, .jpeg"
        type="file"
        name={inputName}
        onChange={onLoadFile}
      />
      {errorLoadingMessage && (
        <span className="bg-red-200 text-red-600 px-2 py-1 text-sm rounded-md">
          {errorLoadingMessage}
        </span>
      )}
    </div>
  );
}
