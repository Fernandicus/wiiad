import { ReactElement } from "react";

export const WatchAdDisplayCover = ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <div className=" w-full h-full flex items-center justify-center  bg-gradient-to-t from-slate-100 via-slate-100 to-slate-100/90">
      {children}
    </div>
  );
};
