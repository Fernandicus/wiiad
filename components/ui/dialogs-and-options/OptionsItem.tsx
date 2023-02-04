import { useEffect, useRef, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { TertiaryButton } from "../buttons/TertiaryButton";

interface IOptionsItem {
  children: JSX.Element[];
}

export const OptionsItem = ({ children }: IOptionsItem) => {
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeDialog = (e: globalThis.MouseEvent) => {
      const mousePath = e.composedPath();
      const containsButtonRef = mousePath.includes(buttonRef.current!);

      if (!containsButtonRef) setShowOptions(false);
    };

    document.body.addEventListener("click", closeDialog);

    return () => document.body.removeEventListener("click", closeDialog);
  }, [buttonRef]);

  return (
    <div className="relative">
      <SecondaryButton
        ref={buttonRef}
        onClick={() => setShowOptions((prev) => !prev)}
        type="button"
      >
        {children[0]}
      </SecondaryButton>
      {showOptions && (
        <div className="absolute overflow-hidden bg-white shadow-lg  rounded-md right-0">
          {children[1]}
        </div>
      )}
    </div>
  );
};
