import { Dispatch, SetStateAction } from "react";

interface Props {
  onSelectImage: Dispatch<
    SetStateAction<string | ArrayBuffer | null | undefined>
  >;
  imagePreview: string | ArrayBuffer | null | undefined;
}

export function SelectImage({ onSelectImage, imagePreview }: Props) {
  return (
    <div className="space-y-5">
      <label className="font-bold">
        Banner <span className="text-sm text-gray-500 font-medium">(aspect ratio 2:4)</span>
      </label>
      <div>
        {imagePreview ? (
          <img
            src={imagePreview.toString()}
            alt="alt"
            className=" h-64 w-full object-cover bg-white/70 rounded-lg"
          ></img>
        ) : (
          <img
            className="h-64 w-full object-cover bg-white/70 rounded-lg"
            src="https://images.unsplash.com/photo-1591254460606-fab865bf82b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
          ></img>
        )}
      </div>
      <input
        required
        className="hover:file:bg-sky-400 file:bg-sky-500 file:rounded-l-lg file:rounded-r-sm file:border-none file:h-full file:text-white file:mr-5 file:px-2 hover:file:cursor-pointer block w-full text-sm text-gray-900 bg-white rounded-lg border h-10 border-gray-300 cursor-pointer"
        id="file_input"
        type="file"
        onChange={(event) => {
          event.preventDefault();
          console.log(event.target.files![0]);
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files![0]);
          reader.onloadend = () => {
            console.log(reader.result);
            onSelectImage(reader.result);
          };
        }}
      />
    </div>
  );
}
