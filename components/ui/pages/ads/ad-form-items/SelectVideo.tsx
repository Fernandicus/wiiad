import { ChangeEvent, useRef, useState } from "react";

interface Props {
  onSelectVideo(video: string): void;
  videoPreview?: string;
  onSuccess(): void;
  inputName: string;
}

export function SelectVideo({ onSelectVideo, videoPreview, onSuccess, inputName }: Props) {
  const videoMaxDuration = 60;
  const videoMaxSize = 40 * 1020 * 1020;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoLoadedRef = useRef<HTMLVideoElement>(null);
  const [errorLoadingMessage, setErrorLoading] = useState<string | null>();

  const onLoadVideo = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    const reader = new FileReader();

    if (file.size > videoMaxSize) {
      setErrorLoading("El archivo es demasiado grande");
    } else {
      reader.readAsDataURL(event.target.files![0]);

      reader.onloadend = () => {
        const res = reader.result as string;

        onSelectVideo(res);
        videoRef.current?.load();
      };

      videoRef.current!.onloadedmetadata = () => {
        if (videoLoadedRef.current!.duration > videoMaxDuration) {
          setErrorLoading("El video es demasiado largo, trata de acortarlo");
        } else {
          onSuccess();
        }
      };
    }
  };

  return (
    <div className="space-y-5">
      <label className="font-bold">
        Sube un video{" "}
        <span
          className={`text-sm  font-medium ${
            !errorLoadingMessage ? "text-gray-500" : "text-red-500"
          }`}
        >
          aspect ratio 16:9 y maximo 60 segundos o 40Mb
        </span>
      </label>
      <div>
        {videoPreview ? (
          <video
            controls
            ref={videoLoadedRef}
            className="w-[576px] h-[324px] object-cover bg-gray-400 rounded-lg"
          >
            <source src={videoPreview.toString()} type="video/mp4" />
            Tu navegador no el formato de video mp4
          </video>
        ) : (
          <video
            controls
            ref={videoRef}
            className="w-[576px] h-[324px] object-cover bg-gray-400 rounded-lg"
          >
            <source type="video/mp4" />
            Tu navegador no el formato de video mp4
          </video>
        )}
      </div>


      <input
        required
        className="hover:file:bg-sky-400 file:bg-sky-500 file:rounded-l-lg file:rounded-r-sm file:border-none file:h-full file:text-white file:mr-5 file:px-2 hover:file:cursor-pointer block w-full text-sm text-gray-900 bg-white rounded-lg border h-10 border-gray-300 cursor-pointer"
        id="file_input"
        type="file"
        accept=".mp4"
        name={inputName}
        onChange={onLoadVideo}
      />

      {errorLoadingMessage && (
        <span className="bg-red-200 text-red-600 px-2 py-1 text-sm rounded-md">
          {errorLoadingMessage}
        </span>
      )}
    </div>
  );
}
