import { AdType } from "@/pages/[userName]/ads";
import { Dispatch, SetStateAction } from "react";
import { AdResourceSelector } from "./AdResourceSelector";

interface Props {
  onTapCreateAd: Dispatch<SetStateAction<AdType | null>>;
}

export function EmptyAds({ onTapCreateAd }: Props) {
  return (
    <div className="flex items-center justify-center text-center h-32">
      <div className="space-y-5">
        <p className="font-medium text-gray-800">
          <span className="normal text-lg">🙀 </span>
          No tienes ningún anuncio creado!
        </p>
        <AdResourceSelector
          onCreateVideoAd={() => onTapCreateAd("video")}
          onCreateImageAd={() => onTapCreateAd("banner")}
        />
        {/* <button
          className="text-sm p-2 bg-sky-500 text-white rounded-md hover:bg-sky-400"
          onClick={(e) => {
            e.preventDefault();
            onTapCreateAd("");
          }}
        >
          Crea un anuncio
        </button> */}
      </div>
    </div>
  );
}
