import { AdType } from "@/pages/ads";
import { Dispatch, SetStateAction } from "react";
import { AdResourceSelector } from "./AdResourceSelector";

interface Props {
  onTapCreateAd: Dispatch<SetStateAction<AdType | null>>;
}

export function EmptyAds({ onTapCreateAd }: Props) {
  return (
    <div className="flex items-center justify-center text-center h-32">
      <div className="space-y-5">
        <p className="font-medium text-gray-800">No tienes anuncios creados</p>
        <AdResourceSelector
          onCreateVideoAd={() => onTapCreateAd("video")}
          onCreateImageAd={() => onTapCreateAd("banner")}
        />
      </div>
    </div>
  );
}
