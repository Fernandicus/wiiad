import { stripePromise } from "../../src/payments/StripePaymentProcess";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export default function StripePaymentElement(param: { clientSecret: string }) {
  const options: StripeElementsOptions = {
    clientSecret: param.clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripeCheckoutForm />
    </Elements>
  );
}
