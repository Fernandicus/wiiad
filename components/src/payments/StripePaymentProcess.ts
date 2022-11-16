import { IPaymentIntent } from "@/src/controllers/StripePaymentController";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";

//? https://stripe.com/docs/payments/quickstart

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export class StripePaymentProcess {
  async setPaymentAmount(
    budgetItem: number,
    adId:string,
    paymentMethod?: string,
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
    adId: string
  ): Promise<string> {
    const { error } = await useStripe.confirmPayment({
      elements: useElements,
      confirmParams: {
        return_url: `http://localhost:3000/${ApiRoutes.paymentCompleted(adId)}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      return error.message!;
    } else {
      return "An unexpected error occurred.";
    }
  }
}
