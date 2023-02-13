import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { useNotification } from "../../hooks/useNotification";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { StripeElement } from "@stripe/stripe-js";

interface IStripeCheckoutForm {
  buttonLabel: string;
  onSubmit(props: { stripe: Stripe; elements: StripeElements }): Promise<void>;
}

export default function StripeCheckoutForm({
  buttonLabel,
  onSubmit,
}: IStripeCheckoutForm) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      id="payment-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!stripe || !elements) return;
        await onSubmit({ stripe, elements });
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
        {buttonLabel}
      </PrimaryButton>
    </form>
  );
}
