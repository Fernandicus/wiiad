import { Dispatch, SetStateAction } from "react";
import { CreateAdTypeButtons } from "./CreateAdTypeButtons";

interface CreateAdSelectorProps {
  onCreateVideoAd(): void;
  onCreateImageAd(): void;
}

export const CreateAdSelector = ({
  onCreateVideoAd,
  onCreateImageAd,
}: CreateAdSelectorProps) => {
  return (
    <div className="space-y-3 p-5">
      <h1 className="font-bold text-center text-slate-600">Crea un anuncio</h1>
      <CreateAdTypeButtons
        onCreateImageAd={onCreateImageAd}
        onCreateVideoAd={onCreateVideoAd}
      />
    </div>
  );
};
