import { AdDurationBar } from "./AdDurationBar";

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
    <AdDurationBar startTimer={startTimer} onEnd={onEnd}>
      <img
        src={adBannerFile}
        alt={bannerAlt}
        className="w-[576px] h-[324px] object-cover  bg-slate-200 rounded-lg"
      ></img>
    </AdDurationBar>
  );
};
