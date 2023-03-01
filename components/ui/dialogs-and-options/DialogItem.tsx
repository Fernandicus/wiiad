import { FormEvent, ReactElement } from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { TertiaryButton } from "../buttons/TertiaryButton";
import { BackIcon } from "../icons/BackIcon";
import { CloseIcon } from "../icons/CloseIcon";

type ActionButton = "close" | "save" | "none";

interface DialogProps {
  hasBackButton?: boolean;
  onBack?(): void;
  title: string;
  children: ReactElement | ReactElement[];
  actionButton?: ActionButton;
  closeDialog?(): void;
  disabledActionBtn?: boolean;
  loadingActionBtn?: boolean;
  onSubmit(e:FormEvent<HTMLFormElement>):void;
}

export const DialogItem = ({
  title,
  children,
  actionButton = "close",
  closeDialog,
  hasBackButton = false,
  disabledActionBtn = true,
  loadingActionBtn = true,
  onBack,
  onSubmit,
}: DialogProps) => {
  const actionButtons: Record<ActionButton, ReactElement | null> = {
    close: (
      <button onClick={closeDialog} className="w-6 h-auto">
        <CloseIcon />
      </button>
    ),
    save: (
      <PrimaryButton
        disabled={disabledActionBtn}
        isLoading={loadingActionBtn}
        size="sm"
        fullWitdth={false}
        type="submit"
      >
        Guardar
      </PrimaryButton>
    ),
    none: null,
  };

  return (
    <>
      <div
        onClick={closeDialog}
        className="absolute top-0 bg-slate-600/20 w-full h-full"
      />

      <form onSubmit={onSubmit} className="absolute inset-10 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-gray-400 shadow-2xl">
        <div className="border-b-2 border-slate-100 left-0 p-5 w-full flex justify-between bg-white">
          <div className="flex space-x-5 items-center">
            {hasBackButton && (
              <button type="reset" onClick={onBack} className="w-7 h-7">
                <BackIcon />
              </button>
            )}

            <div>
              <h1 className="font-medium text-xl">{title}</h1>
            </div>
          </div>
          {actionButtons[actionButton]}
        </div>
        {children}
      </form>
    </>
  );
};
