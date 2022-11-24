import { AdType } from "@/pages/ads";
import { SelectImage } from "./SelectImage";
import { SelectVideo } from "./SelectVideo";

interface ISelectFileProps {
  adType: AdType;
  filePreview: string | null;
  onSuccess(): void;
  inputName:string;
  onSelectFile(file: string | null): void;
}

export const SelectFile = ({
  adType,
  filePreview,
  onSuccess,
  inputName,
  onSelectFile
}: ISelectFileProps) => {
  return (
    <div>
      {adType == "banner" ? (
        <SelectImage
          onSelectImage={onSelectFile}
          imagePreview={filePreview}
          onSuccess={onSuccess}
          inputName={inputName}
        />
      ) : adType == "video" ? (
        <SelectVideo
          onSelectVideo={onSelectFile}
          videoPreview={filePreview}
          onSuccess={onSuccess}
          inputName={inputName}
        />
      ) : null}
    </div>
  );
};
