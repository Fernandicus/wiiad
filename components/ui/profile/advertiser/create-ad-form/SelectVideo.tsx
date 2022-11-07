import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface Props {
  onSelectVideo(video: string | ArrayBuffer | null | undefined): void;
  videoPreview: string | ArrayBuffer | null | undefined;
}

export function SelectVideo({ onSelectVideo, videoPreview }: Props) {
  const videoMaxDuration = 60;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoLoadedRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isTooLong, setIsTooLong] = useState<boolean>(false);

  useEffect(() => {
    if (
      videoLoadedRef.current != null &&
      videoLoadedRef.current.duration > videoMaxDuration
    ) {
      setIsTooLong(true);
    }
  }, [isLoaded]);

  return (
    <div className="space-y-5">
      <label className="font-bold">
        Sube un video{" "}
        <span
          className={`text-sm  font-medium ${
            !isTooLong ? "text-gray-500" : "text-red-500"
          }`}
        >
          16:9 y máximo 60 segundos
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

      {isTooLong && (
        <p className="bg-red-200 text-red-600 px-2 py-1 text-sm rounded-md">
          El video es demasiado largo, trata de acortarlo
        </p>
      )}

      <input
        required
        className="hover:file:bg-sky-400 file:bg-sky-500 file:rounded-l-lg file:rounded-r-sm file:border-none file:h-full file:text-white file:mr-5 file:px-2 hover:file:cursor-pointer block w-full text-sm text-gray-900 bg-white rounded-lg border h-10 border-gray-300 cursor-pointer"
        id="file_input"
        type="file"
        onChange={(event) => {
          event.preventDefault();
          const reader = new FileReader();

          reader.readAsDataURL(event.target.files![0]);

          reader.onloadend = () => {
            onSelectVideo(reader.result);
            videoRef.current?.load();
          };

          videoRef.current!.onloadedmetadata = () => {
            setIsLoaded(true);
          };
        }}
      />
    </div>
  );
}
