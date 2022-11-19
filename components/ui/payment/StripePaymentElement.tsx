import { stripePromise } from "../../src/payments/StripePaymentProcess";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

interface IStripeElementParams {
  clientSecret: string;
  ad:AdPropsPrimitives;
  userName:string;
}

export default function StripePaymentElement({
  clientSecret,
  ad,
  userName,
}: IStripeElementParams) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    }
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripeCheckoutForm adId={ad.id} userName={userName}/>
    </Elements>
  );
}