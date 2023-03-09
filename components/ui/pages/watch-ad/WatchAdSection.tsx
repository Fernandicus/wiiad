import { ReactElement, useEffect, useRef, useState } from "react";
import { WatchBannerItem } from "./items/WatchBannerItem";
import { FwdWatchVideoItem, WatchVideoItem } from "./items/WatchVideoItem";
import { PlayAdThumbnail } from "./PlayAdThumbnail";
import { VisitAdvertiserVideoButton } from "../../buttons/VisitAdvertiserVideoButton";
import { VisitAdvertiserThumbnail } from "./VisitAdvertiserThumbnail";

type ThumbnailProps = Parameters<typeof PlayAdThumbnail>[0] &
  Parameters<typeof VisitAdvertiserThumbnail>[0];

type WatchAdSectionProps = ThumbnailProps & {
  adFile: string;
  adBannerAlt: string;
};

type WatchAdThumbnailTypes = "preWatchThumbnail" | "finishedThumbnail";
type WatchAdStatus = "preWatch" | "watching" | "finished";

export const WatchAdSection = (props: WatchAdSectionProps) => {
  const {
    adFile,
    adDescription,
    adRedirectionUrl,
    onWatchAd,
    adBannerAlt,
    referrerName,
    referrerProfilePic,
    onMonetizeAd,
  } = props;

  const [watchAdStatus, setWatchAdStatus] = useState<WatchAdStatus>("preWatch");
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const watchVideoRef = useRef<FwdWatchVideoItem>(null);

  const showThumbnail = watchAdStatus !== "watching" && true;
  const thumbnailType: WatchAdThumbnailTypes =
    watchAdStatus === "finished" ? "finishedThumbnail" : "preWatchThumbnail";

  const watchAd = () => {
    onWatchAd();
    setStartTimer(true);
    setWatchAdStatus("watching");
  };

  const onWatchAdThumbnail = () => {
    const watchVideo = watchVideoRef.current;
    if (watchVideo) {
      watchVideo.playAd({
        onPlay: watchAd,
        onEnd: () => setWatchAdStatus("finished"),
      });
    } else {
      watchAd();
    }
  };

  const adThumbnailComponent: Record<WatchAdThumbnailTypes, ReactElement> = {
    preWatchThumbnail: (
      <PlayAdThumbnail
        referrerName={referrerName}
        referrerProfilePic={referrerProfilePic}
        onWatchAd={onWatchAdThumbnail}
      />
    ),
    finishedThumbnail: (
      <VisitAdvertiserThumbnail
        adDescription={adDescription}
        adRedirectionUrl={adRedirectionUrl}
        onMonetizeAd={onMonetizeAd}
      />
    ),
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {adFile.includes(".mp4") ? (
        <WatchVideoItem
          startTimer={startTimer}
          ref={watchVideoRef}
          adVideoFile={adFile}
        />
      ) : (
        <WatchBannerItem
          onEnd={() => setWatchAdStatus("finished")}
          startTimer={startTimer}
          adBannerFile={adFile}
          bannerAlt={adBannerAlt}
        />
      )}

      {watchAdStatus === "watching" && (
        <div className="absolute top-3 left-5 overflow-hidden">
          <VisitAdvertiserVideoButton adRedirectionUrl={adRedirectionUrl} />
        </div>
      )}

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          showThumbnail ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {adThumbnailComponent[thumbnailType]}
      </div>
    </div>
  );
};
