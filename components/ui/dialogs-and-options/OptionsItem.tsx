import { useEffect, useRef, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { TertiaryButton } from "../buttons/TertiaryButton";
import { useOpenCloseDialog } from "../hooks/useOpenCloseDialog";

interface IOptionsItem {
  children: JSX.Element[];
}

export const OptionsItem = ({ children }: IOptionsItem) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen } = useOpenCloseDialog({ ref: buttonRef });

  return (
    <div className="relative">
      <SecondaryButton
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {children[0]}
      </SecondaryButton>
      {isOpen && (
        <div className="absolute overflow-hidden bg-white shadow-lg  rounded-md right-0">
          {children[1]}
        </div>
      )}
    </div>
  );
};
