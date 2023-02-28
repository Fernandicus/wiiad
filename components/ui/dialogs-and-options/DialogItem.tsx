import { ReactElement } from "react";
import { BackIcon } from "../icons/BackIcon";
import { CloseIcon } from "../icons/CloseIcon";

interface DialogProps {
  hasBackButton?: boolean;
  onBack?(): void;
  title: string;
  children: ReactElement | ReactElement[];
  hasCloseButton?: boolean;
  closeDialog?(): void;
}

export const DialogItem = ({
  title,
  children,
  hasCloseButton = true,
  closeDialog,
  hasBackButton = false,
  onBack,
}: DialogProps) => {
  return (
    <>
      <div
        onClick={closeDialog}
        className="absolute top-0 bg-slate-600/20 w-full h-full"
      />

      <div className="absolute inset-10 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-gray-400 shadow-2xl">
        <div className="border-b-2 border-slate-100 left-0 p-5 w-full flex justify-between bg-white">
          <div className="flex space-x-5">
            {hasBackButton && (
              <button onClick={onBack} className="w-7 h-7">
                <BackIcon />
              </button>
            )}

            <div>
              <h1 className="font-medium text-xl">{title}</h1>
            </div>
          </div>
          {hasCloseButton && (
            <button onClick={closeDialog} className="w-6 h-auto">
              <CloseIcon />
            </button>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
