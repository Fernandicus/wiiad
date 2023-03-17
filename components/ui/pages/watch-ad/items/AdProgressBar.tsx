import { ReactElement, useEffect, useMemo, useRef, useState } from "react";

export const AdProgressBar = ({
  children,
  duration = 15,
  startTimer = false,
  onEnd,
}: {
  children: ReactElement;
  duration?: number;
  startTimer: boolean;
  onEnd?(): void;
}) => {
  const [time, setTime] = useState<number>(0);

  useMemo(() => {
    if (startTimer == true) {
      const interval = setInterval(() => {
        setTime((prev) => (prev += 1));
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, duration * 1000);
    }
  }, [startTimer]);

  return (
    <div className="relative">
      {children}
      <div className="w-full absolute px-1.5 bottom-0">
        <progress
          className="h-1.5 w-full"
          value={time}
          max={duration}
        ></progress>
      </div>
    </div>
  );
};
