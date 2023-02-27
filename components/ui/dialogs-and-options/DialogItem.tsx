import { ReactElement } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { SegmentsCheckBoxList } from "../pages/ads/ad-form-items/SegmentsCheckBoxList";
import { SectionHeader } from "../pages/items/SectionHeader";

interface DialogProps {
  title: string;
  children: ReactElement | ReactElement[];
  closeDialog(): void;
}

export const DialogItem = ({ title, children, closeDialog }: DialogProps) => {
  return (
    <>
      <div
        onClick={closeDialog}
        className="absolute top-0 bg-slate-600/20 w-full h-full"
      />

      <div className="absolute inset-10 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-gray-400 shadow-2xl">
        <div className="border-b-2 border-slate-100 left-0 p-5 w-full flex justify-between bg-white">
          <div>
            <h1 className="font-medium text-xl">{title}</h1>
          </div>

          <button
            onClick={closeDialog}
            className="w-6 h-auto"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};
