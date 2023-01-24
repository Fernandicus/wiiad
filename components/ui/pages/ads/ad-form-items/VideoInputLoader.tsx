import { ChangeEvent, RefObject } from "react";

interface IVideoInputLoaderProps {
  videoPreview?: string;
  inputName?: string;
  onSelect(event: ChangeEvent<HTMLInputElement>): void;
  videoRef: RefObject<HTMLVideoElement>;
  videoClassName: string;
}

export const VideoInputLoader = (params: IVideoInputLoaderProps) => {
  const { videoClassName, videoPreview, inputName, onSelect, videoRef } =
    params;

  const videoPlayer = (videoPreview?: string) => {
    return (
      <video
        controls
        ref={videoRef}
        className={`${videoClassName} object-cover bg-gray-400 rounded-lg`}
      >
        <source src={videoPreview} type="video/mp4" />
        Tu navegador no acepta el formato de video mp4
      </video>
    );
  };

  return (
    <div className="space-y-2">
      {videoPreview ? videoPlayer(videoPreview.toString()) : videoPlayer()}
      <input
        required
        className="hover:file:bg-sky-400 file:bg-sky-500 file:rounded-l-lg file:rounded-r-sm file:border-none file:h-full file:text-white file:mr-5 file:px-2 hover:file:cursor-pointer block w-full text-sm text-gray-900 bg-white rounded-lg border h-10 border-gray-300 cursor-pointer"
        id="video-input"
        type="file"
        accept=".mp4"
        name={inputName}
        onChange={onSelect}
      />
    </div>
  );
};
