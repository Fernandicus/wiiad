import { RefObject, useEffect } from "react";

export const useAdDurationEngine = <T extends HTMLElement>(params: {
  ref: RefObject<T>;
  duration: number;
  startTimer: boolean;
  onEnd?():void;
}) => {
  const { ref, startTimer, duration, onEnd } = params;

  const milliseconds = (seconds: number, widthInPX: number): number => {
    const fps = 25;
    const oneFrameInMilliseconds = 1000 / fps;

    const totalFPS = seconds * fps;
    const fpsPerPixel = totalFPS / widthInPX;

    return oneFrameInMilliseconds * fpsPerPixel;
  };

  const intervalEngine = (offsetWidth: number) =>
    setInterval(() => {
      const px = "px";
      const translate = ref.current!.style.translate;
      const translateSliced = translate.slice(0, translate.indexOf(px));
      const translateInt = parseInt(translateSliced);

      if (translateInt < offsetWidth) {
        const translateX = (translateInt + 1).toString();
        ref.current!.style.translate = translateX + px;
      }
    }, milliseconds(duration, offsetWidth));

  useEffect(() => {
    if (startTimer && ref.current) {
      ref.current.style.translate = "0px";
      const offsetWidth = ref.current.offsetWidth;
      const interval = intervalEngine(offsetWidth);

      const timeOut = setTimeout(() => {
        clearInterval(interval);
        if(onEnd) onEnd();
      }, duration * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeOut);
      };
    }
  }, [startTimer]);
};
