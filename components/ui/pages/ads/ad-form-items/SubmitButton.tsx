import { LoadingSpinnerAnimation } from "@/components/ui/icons/LoadingSpinnerAnimation";

interface ISubitButtonProps {
  isFile: boolean;
  isSendingAd: boolean;
  label: string;
}

export const SubmitButton = ({
  isFile,
  isSendingAd,
  label,
}: ISubitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isFile ? false : true}
      className={`p-2 rounded-md ${
        isFile
          ? "bg-sky-500 text-white  hover:bg-sky-400"
          : "bg-gray-300 text-gray-500 "
      }`}
    >
      {isSendingAd ? (
        <div className="w-6 h-6">
          <LoadingSpinnerAnimation />
        </div>
      ) : (
        label
      )}
    </button>
  );
};
