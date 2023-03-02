import { LegacyRef, MouseEventHandler, ReactElement, RefObject } from "react";

type TButton = "button" | "submit" | "reset" | undefined;

export interface IButtonProps {
  children: ReactElement | ReactElement[] | string;
  isLoading?: boolean;
  type: TButton;
  disabled?: boolean;
  onClick?: MouseEventHandler | undefined;
  onSumbit?(): void;
  fullWitdth?: boolean;
}
