import { MouseEventHandler } from "react";

type TButton = "button" | "submit" | "reset" | undefined;

export interface IButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  isLoading?: boolean;
  type?: TButton;
  onClick?: MouseEventHandler | undefined;
  onSumbit?(): void;
}
