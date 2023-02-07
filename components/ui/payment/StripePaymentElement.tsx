import { Elements } from "@stripe/react-stripe-js";
import {
  Stripe,
  StripeElements,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { stripePromise } from "@/components/hooks/advertiser/payments/stripe/useUserStripe";

export default function StripePaymentElement(params: {
  clientSecret: string;
  buttonLabel: string;
  onSubmit(props: { stripe: Stripe; elements: StripeElements }): Promise<void>;
}) {
  const { buttonLabel, clientSecret, onSubmit } = params;
  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripeCheckoutForm buttonLabel={buttonLabel} onSubmit={onSubmit} />
    </Elements>
  );
}
