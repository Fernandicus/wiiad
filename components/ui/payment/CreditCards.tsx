import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { useState } from "react";

interface ICreditCardsParams {
  paymentMethods?: ICardDetailsPrimitives[];
  onSelectedMethod(method?: string): void;
}

export const CreditCards = ({
  paymentMethods,
  onSelectedMethod,
}: ICreditCardsParams) => {
  const [isMethodSelected, setMethodSelected] = useState<string>();

  return (
    <div className="h-48 flex ">
      <div className="w-full space-y-2 ">
        {paymentMethods &&
          paymentMethods.map((pMethod) => (
            <button
              key={pMethod.paymentMethodId}
              className={` border p-4 rounded-lg w-full text-center transition-all duration-150 ease-in ${
                isMethodSelected === pMethod.paymentMethodId
                  ? "bg-green-50/50 text-green-700 border-green-200"
                  : "bg-white  text-green-700 border-green-100 "
              }`}
              onClick={() => {
                setMethodSelected(pMethod.paymentMethodId);
                onSelectedMethod(pMethod.paymentMethodId);
              }}
            >
              <div className=" flex items-center space-x-5 justify-around">
                <p className="text-gray-500 font-medium">
                  {pMethod.brand.toUpperCase()}
                </p>
                <div className="text-right">
                  <p className=" font-normal text-gray-400">{`**** ${pMethod.last4}`}</p>
                  <p className=" text-xs font-light text-gray-400">{`${pMethod.expMonth} / ${pMethod.expYear}`}</p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};
