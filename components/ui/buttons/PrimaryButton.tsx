import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const PrimaryButton = ({
  isLoading = false,
  children,
  onClick,
  onSumbit,
  type,
}: IButtonProps) => {
  return (
    <button
      className="bg-sky-500 text-white p-1 w-full h-10 rounded-md hover:bg-sky-400 transition ease-in duration-150"
      type={type}
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
