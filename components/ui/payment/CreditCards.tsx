import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { useState } from "react";
import { CreditCardButton } from "./items/CreditCardButton";

interface ICreditCardsParams {
  paymentMethods?: ICardDetailsPrimitives[];
}

export const CreditCards = ({ paymentMethods }: ICreditCardsParams) => {
  const {state} = usePaymentProcess()
  const [isMethodSelected, setMethodSelected] = useState<string>(state.paymentMethod);
  const { storePaymentMethod } = usePaymentProcess();

  return (
    <div className="h-48 flex ">
      <div className="w-full space-y-2 ">
        {paymentMethods &&
          paymentMethods.map((pMethod) => (
            <div key={pMethod.paymentMethodId}>
              <CreditCardButton
                isSelected={isMethodSelected === pMethod.paymentMethodId}
                onClick={() => {
                  setMethodSelected(pMethod.paymentMethodId);
                  storePaymentMethod(pMethod.paymentMethodId);
                }}
                pMethod={pMethod}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
