import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import { useState } from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface IPaymentButtonsProps {
  adId: string;
  onClientSecret(secret: string): void;
}

export const PaymentButtons = ({
  adId,
  onClientSecret,
}: IPaymentButtonsProps) => {
  const { state, payWithExistingCard, payWithNewCard } = usePaymentProcess();
  const [isPaying, setIsPaying] = useState(false);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);
  const pmethod = state.paymentMethod;

  return (
    <div className="space-y-2">
      <PrimaryButton
        type="button"
        disabled={pmethod ? false : true}
        isLoading={isPaying}
        onClick={async (e) => {
          e.preventDefault();
          if (isPaying) return;
          setIsPaying(true);
          if (!pmethod) await payWithNewCard(adId);
          else await payWithExistingCard(adId);
          setIsPaying(false);
        }}
      >
        Pagar y lanzar
      </PrimaryButton>
      <SecondaryButton
        type="button"
        isLoading={isLoadingNewCard}
        onClick={async (e) => {
          e.preventDefault();
          if (isLoadingNewCard) return;
          setIsLoadingNewCard(true);
          const clientSecret =  await payWithNewCard(adId);
          onClientSecret(clientSecret)
          setIsLoadingNewCard(false);
        }}
      >
        Usar nueva tarjeta
      </SecondaryButton>
    </div>
  );
};
