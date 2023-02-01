import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const RemoveButton = (props: IButtonProps) => {
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
      className={`${
        disabled
          ? "bg-gray-300 text-gray-500"
          : "bg-red-100 hover:bg-red-500 text-red-500 hover:text-white transition ease-in duration-100"
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
};
