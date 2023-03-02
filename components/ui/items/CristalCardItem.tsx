import { ReactElement } from "react";

interface ICristalCardItem {
  children: ReactElement | ReactElement[];
}

export const CristalCardItem = ({ children }: ICristalCardItem) => {
  return (
    <div className="p-10 bg-gradient-to-tr from-white/50 via-slate-200/10 to-white/70 border-2 border-white/50 rounded-xl shadow-lg shadow-slate-200/50">
      {children}
    </div>
  );
};
