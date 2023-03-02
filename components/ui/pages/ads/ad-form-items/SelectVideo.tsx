import { ChangeEvent, useRef, useState } from "react";
import { useFileUploader } from "../hooks/useFileUploader";
import { ErrorLabel } from "./ErrorLabel";
import { TitleWithDescriptionLabel } from "./TitleWithDescriptionLabel";
import { VideoInputLoader } from "./VideoInputLoader";

interface Props {
  onSuccess(file: string): void;
  inputName: string;
}

export function SelectVideo({ onSuccess, inputName }: Props) {
  const videoMaxDuration = 60;
  const fileMaxSize = 40 * 1020 * 1020;
  const mbToBytes = 1000000;
  const mb = Math.floor(fileMaxSize / mbToBytes);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onLoadedMetadata = () => {
    if (videoRef.current!.duration > videoMaxDuration) {
      setErrorMessage("El video es demasiado largo, trata de acortarlo");
    } else {
      setErrorMessage("");
    }
  };

  const videoSuccess = (file: string) => {
    onSuccess(file);
    videoRef.current?.load();
    videoRef.current!.onloadedmetadata = onLoadedMetadata;
  };

  const uploader = useFileUploader({ fileMaxSize, onSuccess: videoSuccess });

  return (
    <div className="space-y-2">
      <TitleWithDescriptionLabel
        title="Sube un video (16:9)"
        description={`Máximo ${mb}Mb y 60 segundos de duración`}
      />
      <VideoInputLoader
        videoRef={videoRef}
        videoPreview={uploader.filePreview}
        inputName={inputName}
        onSelect={uploader.onSelectFile}
        videoClassName="w-[576px] h-[324px]"
      />
      {uploader.hasError ? (
        <ErrorLabel errorText={uploader.errorMessage} />
      ) : errorMessage ? (
        <ErrorLabel errorText={uploader.errorMessage} />
      ) : null}
    </div>
  );
}
