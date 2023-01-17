import { MouseEventHandler } from "react";

type TButton = "button" | "submit" | "reset" | undefined;

export interface IButtonProps {
  label: string;
  type?: TButton;
  onClick?: MouseEventHandler | undefined;
  onSumbit?(): void;
}