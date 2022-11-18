import { useState } from "react";

interface ICreditCardsParams {
  paymentMethods: string[];
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
        {paymentMethods.map((pMethod) => (
          <button
            key={pMethod}
            className={` border p-4 rounded-lg w-full text-center transition-all duration-150 ease-in ${
              isMethodSelected === pMethod
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-white  text-green-700 border-green-100 "
            }`}
            onClick={() => {
              setMethodSelected(pMethod);
              onSelectedMethod(pMethod);
             
            }}
          >
            <div className="text-green-600 flex justify-center items-center space-x-5">
              <p className="">Visa</p>
              <p className=" align-base font-normal">**** 4242</p>
            </div>
          </button>
        ))}

        {/* <button
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
        </button> */}
      </div>
    </div>
  );
};
