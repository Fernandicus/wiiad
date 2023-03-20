import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AdProgressBar } from "./AdProgressBar";

interface WatchVideoItemProps {
  adVideoFile: string;
  startTimer: boolean;
}

export interface FwdWatchVideoItem {
  playAd(props: { onPlay?: () => void; onEnd?: () => void }): void;
}

export const WatchVideoItem = forwardRef(
  (props: WatchVideoItemProps, ref: ForwardedRef<FwdWatchVideoItem>) => {
    const { adVideoFile } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState<number>(0);

    const playVideo = (onEnd?: () => void) => {
      setTimeout(() => {
        videoRef.current?.play();
        videoRef.current!.muted = false;
        if (onEnd)
          videoRef.current!.onended = (_) =>
            setTimeout(() => {
              onEnd();
            }, 500);
      }, 500);
    };

    useMemo(() => {
      const isVideoEnabled = videoRef.current && videoRef.current.duration;
      if (isVideoEnabled) setDuration(videoRef.current.duration);
    }, [videoRef.current]);

    useImperativeHandle(ref, () => ({
      playAd({ onPlay, onEnd }) {
        if (onPlay) onPlay();
        playVideo(onEnd);
      },
    }));

    return (
      <AdProgressBar startTimer={props.startTimer} duration={duration}>
        <video
          ref={videoRef}
          muted
          //controls={false}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture={true}
          className="w-[576px] h-[324px] object-cover  bg-slate-200 rounded-lg"
        >
          <source src={adVideoFile} type="video/mp4" />
          Tu navegador no el formato de video mp4
        </video>
      </AdProgressBar>
    );
  }
);
