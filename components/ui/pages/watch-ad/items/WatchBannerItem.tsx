import { AdProgressBar } from "./AdProgressBar";

export const WatchBannerItem = ({
  adBannerFile,
  bannerAlt,
  startTimer,
  onEnd,
}: {
  adBannerFile: string;
  bannerAlt: string;
  startTimer:boolean;
  onEnd?():void;
}) => {

  return (
    <AdProgressBar onEnd={onEnd} startTimer={startTimer}>
      <img
        src={adBannerFile}
        alt={bannerAlt}
        className="w-[576px] h-[324px] object-cover  bg-slate-200 rounded-lg"
      ></img>
    </AdProgressBar>
  );
};
