import { ReactElement, useRef } from "react";
import { useAdDurationEngine } from "./hooks/useAdDurationEngine";

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
  const ref = useRef<HTMLDivElement>(null);
  useAdDurationEngine({ duration, ref, startTimer, onEnd });

  return (
    <div className="relative">
      {children}
      <div className="w-full absolute px-1.5 bottom-0">
        <div className="overflow-hidden rounded-md">
          <div
            ref={ref}
            className={`-translate-x-full w-full h-1 bg-yellow-500`}
          />
        </div>
      </div>
    </div>
  );
};
