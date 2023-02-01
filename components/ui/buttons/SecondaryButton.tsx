import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";
import { IButtonProps } from "./interfaces/IButtonProps";

export const SecondaryButton = ({
  fullWitdth = true,
  children,
  isLoading,
  onClick,
  onSumbit,
  type,
}: IButtonProps) => {
  return (
    <button
      className={`${fullWitdth && "w-full"} text-sky-500 bg-sky-50 hover:bg-sky-100 transition ease-in duration-150 btn`}
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
