import { LegacyRef, MouseEventHandler, RefObject } from "react";

type TButton = "button" | "submit" | "reset" | undefined;

export interface IButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  isLoading?: boolean;
  type: TButton;
  disabled?:boolean;
  onClick?: MouseEventHandler | undefined;
  onSumbit?(): void;
  ref?:RefObject<HTMLButtonElement>;
}
