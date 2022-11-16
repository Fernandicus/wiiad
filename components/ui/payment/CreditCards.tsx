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
    <div className="space-x-5">
      {paymentMethods.map((pMethod) => (
        <button
          key={pMethod}
          className={`${
            method === pMethod
              ? "bg-sky-500 text-white"
              : "bg-white-500 text-sky-500 border-sky-500"
          } border font-bold p-3 rounded-lg inline-block w-20 text-center`}
          onClick={() => {
            setPaymentMethod(pMethod);
            onSelectedMethod(pMethod);
          }}
        >
          Visa
        </button>
      ))}
      <button
        className={`${
          !method
            ? "bg-sky-500 text-white border-sky-500"
            : "bg-white text-sky-500 border-sky-500"
        } border font-medium bg-white-500 p-3 rounded-lg inline-block text-center`}
        onClick={() => {
          setPaymentMethod(undefined);
          onSelectedMethod(undefined);
        }}
      >
        Nueva tarjeta
      </button>
    </div>
  );
};
