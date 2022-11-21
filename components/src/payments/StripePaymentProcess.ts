import { IPaymentIntent } from "@/src/controllers/StripePaymentController";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { PublicKeys } from "@/src/utils/PublicKeys";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";

//? https://stripe.com/docs/payments/quickstart

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export const stripePromise = loadStripe(PublicKeys.stripe);

export class StripePaymentProcess {
  async setPaymentAmount(
    budgetItem: number,
    adId: string,
    paymentMethod?: string
  ): Promise<string> {
    try {
      const paymentIntentResp = await fetch(ApiRoutes.stripePaymentIntent, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budgetItem,
          paymentMethod,
          adId,
        }),
      });
      const paymentIntentJSON = await paymentIntentResp.json();
      const paymentIntent = paymentIntentJSON as IPaymentIntent;

      return paymentIntent.clientSecret;
    } catch (err) {
      console.error(err);
      throw new Error("Algo no fue bien");
    }
  }

  //? https://stripe.com/docs/payments/save-during-payment?platform=web&client=react#web-submit-payment
  async confirmPayment(
    useStripe: Stripe,
    useElements: StripeElements,
    userName: string
  ): Promise<string> {
    const path = ApiRoutes.paymentCompleted(userName);
    try {
      await useStripe.confirmPayment({
        elements: useElements,
        //redirect: "if_required",
        // redirect: "always",
        confirmParams: {
          return_url: path,
        },
      });
      return "Pago completado!";
    } catch (err) {
      return "Algo fue mal";
    }
  }
}
