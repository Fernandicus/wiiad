import { useState } from "react";

interface ICreditCardsParams {
  paymentMethods: string[];
  onSelectedMethod(method?: string): void;
}

export const CreditCards = ({
  paymentMethods,
  onSelectedMethod,
}: ICreditCardsParams) => {
  const [method, setPaymentMethod] = useState<string>();

  return (
    <div className="h-48 flex items-center">
      <div className="w-full space-y-2 ">
        {paymentMethods.map((pMethod) => (
          <button
            key={pMethod}
            className={`${
              method === pMethod
                ? "bg-slate-200 text-gray-700 border-slate-200 font-semibold"
                : "bg-white  text-slate-700 border-slate-100 "
            } border p-4 rounded-lg w-full text-center `}
            onClick={() => {
              setPaymentMethod(pMethod);
              onSelectedMethod(pMethod);
            }}
          >
            <div className="flex justify-center items-center space-x-5">
              <p className="">Visa</p>
              <p className="text-gray-600 align-base">**** 4242</p>
            </div>
          </button>
        ))}

        <button
          className={`${
            !method
              ? "bg-slate-200 text-gray-700 border-slate-200 "
              : "bg-white  text-slate-700 border-slate-100"
          } border   bg-white-500 p-4 rounded-lg block w-full text-center`}
          onClick={() => {
            setPaymentMethod(undefined);
            onSelectedMethod(undefined);
          }}
        >
          Usar nueva tarjeta
        </button>
      </div>
    </div>
  );
};
