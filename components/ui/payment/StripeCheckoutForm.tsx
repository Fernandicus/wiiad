import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { useNotification } from "../notifications/hooks/useNotification";
import { useUserStripe } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { confirmPayment } = useUserStripe();

  const [isLoading, setIsLoading] = useState(false);

  /* useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setNotification({ message: "Payment succeeded!", status: "success" });
          break;
        case "requires_payment_method":
          setNotification({
            message: "Debes añadir una tarjeta",
            status: "error",
          });
          break;
        default:
          setNotification({ message: "Algo fue mal", status: "error" });
          break;
      }
    });
  }, [stripe]); */

  return (
    <form
      id="payment-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsLoading(true);
        await confirmPayment({ useStripe: stripe, useElements: elements });
        setIsLoading(false);
      }}
      className="space-y-5"
    >
      <PaymentElement id="payment-element" />
      <PrimaryButton
        isLoading={isLoading}
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        Pagar y lanzar
      </PrimaryButton>
    </form>
  );
}
