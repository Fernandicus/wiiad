import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const PrimaryButton = (props: IButtonProps) => {
  const {
    isLoading = false,
    disabled = false,
    children,
    onClick,
    onSumbit,
    type,
  } = props;

  return (
    <button
      className={`${
        disabled
          ? "bg-gray-300 text-gray-500"
          : "bg-sky-500 text-white hover:bg-sky-400 transition ease-in duration-150"
      } p-1 w-full h-10 rounded-md`}
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
};
