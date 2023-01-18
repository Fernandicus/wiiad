import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const SecondaryButton = ({
  children,
  isLoading,
  onClick,
  onSumbit,
  type,
}: IButtonProps) => {
  return (
    <button
      className="p-1 w-full h-10 text-sky-500  bg-sky-50 hover:bg-sky-100 transition ease-in duration-150 rounded-md"
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