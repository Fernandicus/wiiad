import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { useState } from "react";
import { PaymentMethodButton } from "./items/PaymentMethodButton";

interface IPaymentMethodParams {
  paymentMethods?: ICardDetailsPrimitives[];
}

export const PaymentMethod = ({ paymentMethods }: IPaymentMethodParams) => {
  const {state, storePaymentMethod} = usePaymentProcess()
  const [isMethodSelected, setMethodSelected] = useState<string>(state.paymentMethod);

  return (
    <div className="h-48 flex ">
      <div className="w-full space-y-2 ">
        {paymentMethods &&
          paymentMethods.map((pMethod) => (
            <div key={pMethod.paymentMethodId}>
              <PaymentMethodButton
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
