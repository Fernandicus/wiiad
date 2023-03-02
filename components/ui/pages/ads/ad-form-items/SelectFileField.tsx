import { AdType } from "@/pages/ads";
import { SelectImage } from "./SelectImage";
import { SelectVideo } from "./SelectVideo";

interface ISelectFileProps {
  adType: AdType;
  onSuccess(file: string): void;
  inputName: string;
}

export const SelectFileField = (params: ISelectFileProps) => {
  const { adType, onSuccess, inputName } = params;
  return (
    <div>
      {adType == "banner" ? (
        <SelectImage onSuccess={onSuccess} inputName={inputName} />
      ) : adType == "video" ? (
        <SelectVideo onSuccess={onSuccess} inputName={inputName} />
      ) : null}
    </div>
  );
};
