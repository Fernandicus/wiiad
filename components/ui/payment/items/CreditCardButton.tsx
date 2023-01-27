import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";

interface ICreditCardButtonProps {
  pMethod: ICardDetailsPrimitives;
  isSelected: boolean;
  onClick(): void;
}

export const CreditCardButton = ({
  pMethod,
  isSelected,
  onClick,
}: ICreditCardButtonProps) => {
  return (
    <button
      className={`border p-4 rounded-lg w-full text-center transition-all duration-150 ease-in ${
        isSelected
          ? "bg-sky-50 text-sky-500 border-sky-500"
          : "bg-white  text-green-700 border-slate-200 "
      }`}
      onClick={onClick}
    >
      <div className=" flex items-center space-x-5 justify-around">
        <p
          className={`${
            isSelected ? "text-gray-600" : "text-gray-400 "
          } font-medium`}
        >
          {pMethod.brand.toUpperCase()}
        </p>
        <div className="text-right">
          <p
            className={`${
              isSelected ? "text-gray-600" : "text-gray-400 "
            } font-normal`}
          >{`**** ${pMethod.last4}`}</p>
          <p
            className={`${
              isSelected ? "text-gray-500" : "text-gray-400 "
            } text-xs font-light`}
          >{`${pMethod.expMonth} / ${pMethod.expYear}`}</p>
        </div>
      </div>
    </button>
  );
};
