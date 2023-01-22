import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { PlayIcon } from "../../../icons/PlayIcon";
import { PauseIcon } from "../../../icons/PauseIcon";

interface AdCardItemProps {
  image: string;
  children?: JSX.Element | JSX.Element[];
}

export const AdCardItem = ({ image, children }: AdCardItemProps) => {
  const [isLoadedFile, setLoadedFile] = useState<boolean>(false);
  const [isPalying, setIsPalying] = useState<boolean>(false);

  useEffect(() => {
    setLoadedFile(true);
  }, [image]);

  return (
    <div className="rounded-lg bg-white shadow-xl shadow-slate-200">
      {isLoadedFile && image.includes(".mp4") ? (
        <div className="group w-full relative rounded-t-lg overflow-hidden">
          <div className="">
            <ReactPlayer
              url={image}
              width={"100%"}
              height={"100%"}
              playing={isPalying}
            />
          </div>
          <button
            className="absolute bottom-0 w-full h-full text-center flex justify-center items-center "
            onClick={() => setIsPalying((val) => (val = !val))}
          >
            <div
              className={`${
                isPalying ? "text-white/20" : "text-white/60"
              } group-hover:text-white transform duration-150 ease-in w-10 h-10`}
            >
              {isPalying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </button>
        </div>
      ) : isLoadedFile ? (
        <img src={image} className="bg-white/70 rounded-t-lg"></img>
      ) : null}
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
};
