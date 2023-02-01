import { usePaymentProcess } from "@/components/hooks/advertiser/payments/payment-process/usePaymentProcess";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";
import { useState } from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface IPaymentButtonsProps {
  onClientSecret(secret: string): void;
}

export const PaymentButtons = ({ onClientSecret }: IPaymentButtonsProps) => {
  const { payWithExistingCard, payWithNewCard } = useUserStripe();
  const { state } = usePaymentProcess();
  const pmethod = state.paymentMethod;
  const [isPaying, setIsPaying] = useState(false);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);

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
          if (!pmethod) await payWithNewCard();
          else await payWithExistingCard();
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
          const clientSecret = await payWithNewCard();
          onClientSecret(clientSecret);
          setIsLoadingNewCard(false);
        }}
      >
        Usar nueva tarjeta
      </SecondaryButton>
    </div>
  );
};
