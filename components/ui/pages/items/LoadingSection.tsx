import { LoadingSpinnerAnimation } from "../../icons/LoadingSpinnerAnimation";

export const LoadingSection = () => {
  return (
    <div className="w-full py-20  flex justify-center">
      <div className="w-10 text-sky-500 stroke-1">
        <LoadingSpinnerAnimation />
      </div>
    </div>
  );
};
