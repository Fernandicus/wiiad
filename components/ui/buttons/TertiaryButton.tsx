import { ForwardedRef, forwardRef } from "react";
import { IButtonProps } from "./interfaces/IButtonProps";

export const TertiaryButton = forwardRef(
  (props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        className=" text-sky-500"
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
);
