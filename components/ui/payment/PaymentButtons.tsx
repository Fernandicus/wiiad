import { StripePaymentProcess } from "@/components/src/payments/StripePaymentProcess";
import { useState } from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface IPaymentButtonsProps {
  pmethod: string;
  amountToPay: number;
  adId: string;
  onClientSecret(secret: string): void;
}

export const PaymentButtons = ({
  pmethod,
  amountToPay,
  adId,
  onClientSecret,
}: IPaymentButtonsProps) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);
  const stripePayment = new StripePaymentProcess();

  const payWithExistingCard = async () => {
    setIsPaying(true);
    if (isPaying) return;
    if (!adId) return;
    if (amountToPay < 0) return;
    try {
      const stripePayment = new StripePaymentProcess();
      await stripePayment.payWithSelectedCard({
        budgetItem: amountToPay,
        adId: adId,
        paymentMethod: pmethod,
      });
      setIsPaying(false);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const payWithNewCard = async () => {
    setIsLoadingNewCard(true);

    if (isPaying) return;
    if (!adId) return;
    if (amountToPay < 0) return;

    try {
      const clientSecret = await stripePayment.payUsingNewCard({
        budgetItem: amountToPay,
        adId,
      });
      setIsLoadingNewCard(false);
      onClientSecret(clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-2">
      <PrimaryButton
        type="button"
        disabled={pmethod ? false : true}
        isLoading={isPaying}
        onClick={async (e) => {
          e.preventDefault();
          if (!pmethod) await payWithNewCard();
          else await payWithExistingCard();
        }}
      >
        Pagar y lanzar
      </PrimaryButton>
      <SecondaryButton
        type="button"
        isLoading={isLoadingNewCard}
        onClick={async (e) => {
          e.preventDefault();
          await payWithNewCard();
        }}
      >
        Usar nueva tarjeta
      </SecondaryButton>
    </div>
  );
};
