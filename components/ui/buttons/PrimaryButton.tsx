import { ForwardedRef, forwardRef } from "react";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const PrimaryButton = forwardRef(
  (props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      isLoading = false,
      disabled = false,
      fullWitdth = true,
      children,
      onClick,
      onSumbit,
      type,
    } = props;

    return (
      <button
        ref={ref}
        className={`${
          disabled
            ? "bg-gray-300 text-gray-500"
            : "bg-sky-500 text-white hover:bg-sky-400 transition ease-in duration-150"
        } ${fullWitdth && "w-full"} btn`}
        type={type}
        disabled={disabled}
        onClick={onClick}
        onSubmit={onSumbit}
      >
        {isLoading ? (
          <div className="w-full flex justify-center">
            <div className="w-6">
              <LoadingSpinnerAnimation />
            </div>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);
