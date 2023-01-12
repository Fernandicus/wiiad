import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { PublicKeys } from "@/src/utils/PublicKeys";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";

//? https://stripe.com/docs/payments/quickstart

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

interface IPaymentParams {
  budgetItem: number;
  adId: string;
  paymentMethod?: string;
}

interface IPaymentIntent {
  clientSecret: string;
  paymentIntent: string;
}

export const stripePromise = loadStripe(PublicKeys.stripe);

export class StripePaymentProcess {
  async payUsingNewCard(params: {
    budgetItem: number;
    adId: string;
  }): Promise<string> {
    const { budgetItem, adId } = params;
    try {
      const paymentIntentResp = await this.pay({ adId, budgetItem });
      if (paymentIntentResp.status !== 200)
        throw new Error("Error durante el pago");
      const paymentIntentJSON = await paymentIntentResp.json();
      const paymentIntent = paymentIntentJSON as IPaymentIntent;
      return paymentIntent.clientSecret;
    } catch (err) {
      console.error(err);
      throw new Error("Algo no fue bien");
    }
  }

  async payWithSelectedCard(params: {
    budgetItem: number;
    adId: string;
    paymentMethod: string;
  }): Promise<void> {
    const { budgetItem, adId, paymentMethod } = params;
    console.log("BUDGET ", budgetItem);
    try {
      const paymentIntentResp = await this.pay({
        adId,
        budgetItem,
        paymentMethod,
      });
      if (paymentIntentResp.status !== 200)
        throw new Error("Error durante el pago");
    } catch (err) {
      console.error(err);
      throw new Error("Algo no fue bien");
    }
  }

  private async pay(paymentParams: IPaymentParams): Promise<Response> {
    if (!paymentParams.paymentMethod) {
      return await this.fetchPayment({
        route: ApiRoutes.stripePayWithoutPMethod,
        paymentParams,
      });
    } else {
      return await this.fetchPayment({
        route: ApiRoutes.stripePayWithPMethod,
        paymentParams,
      });
    }
  }

  private async fetchPayment(params: {
    route: string;
    paymentParams: IPaymentParams;
  }): Promise<Response> {
    const resp = await fetch(params.route, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.paymentParams),
    });
    return resp;
  }

  //? https://stripe.com/docs/payments/save-during-payment?platform=web&client=react#web-submit-payment
  async confirmPayment(
    useStripe: Stripe,
    useElements: StripeElements
  ): Promise<{ message: string; status: number }> {
    const path = ApiRoutes.paymentCompleted();
    try {
      await useStripe.confirmPayment({
        elements: useElements,
        //redirect: "if_required",
        confirmParams: {
          return_url: path,
        },
      });
      return { message: "Pago completado!", status: 0 };
    } catch (err) {
      return { message: "Pago completado!", status: 2 };
    }
  }
}
