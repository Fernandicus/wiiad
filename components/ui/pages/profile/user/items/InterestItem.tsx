import { CloseIcon } from "@/components/ui/icons/CloseIcon";

export const InterestItem = ({ interest }: { interest: string }) => {
  return (
    <div
      className={`inline-block text-gray-500 border border-gray-300  peer-checked/input:text-sky-500 peer-checked/input:border-sky-400  rounded-full px-3 py-1`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5">
          <CloseIcon />
        </div>
        <p>{interest}</p>
      </div>
    </div>
  );
};
