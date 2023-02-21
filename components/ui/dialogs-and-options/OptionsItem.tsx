import { ReactElement, useEffect, useRef, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { TertiaryButton } from "../buttons/TertiaryButton";
import { useOpenCloseOptionsDialog } from "../hooks/useOpenCloseOptionsDialog";
import { AddIcon } from "../icons/AddIcon";

interface IOptionsItem {
  children: ReactElement;
}

export const OptionsItem = ({ children }: IOptionsItem) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen } = useOpenCloseOptionsDialog({ ref: buttonRef });

  return (
    <div className="relative">
      <SecondaryButton
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <div className="flex items-center space-x-1">
          <div className="stroke-2 w-4">
            <AddIcon />
          </div>
          <span>Crear anuncio</span>
        </div>
      </SecondaryButton>
      {isOpen && (
        <div className="absolute overflow-hidden bg-white shadow-lg  rounded-md right-0">
          {children}
        </div>
      )}
    </div>
  );
};
