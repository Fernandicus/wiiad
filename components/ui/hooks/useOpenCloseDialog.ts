import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ICloseDialogProps<T> {
  ref: RefObject<T>;
  onCloseDialog?(): void;
}

interface ICloseDialog {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useOpenCloseDialog = <T extends HTMLElement>({
  ref,
  onCloseDialog,
}: ICloseDialogProps<T>): ICloseDialog => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const closeDialog = (e: MouseEvent) => {
      const mousePath = e.composedPath();
      const containsButtonRef = mousePath.includes(ref.current!);
      if (!containsButtonRef) {
        setIsOpen(false);
      }
      if (!containsButtonRef && onCloseDialog) onCloseDialog();
    };

    document.addEventListener("click", closeDialog);

    return () => document.addEventListener("click", closeDialog);
  }, []);

  return { isOpen, setIsOpen };
};
