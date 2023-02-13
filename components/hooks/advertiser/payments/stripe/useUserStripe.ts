import {
  payWithStripeHandler,
  setupIntentClientHandler,
} from "@/components/src/payments/stripe/infrastructure/pay-with-stripe-container";
import { useNotification } from "@/components/ui/notifications/hooks/useNotification";
import { stripeSliceActions } from "@/context/advertisers/payments/stripe/stripe-slice";
import {
  AppDispatch,
  TStateStripe,
} from "@/context/common/infrastructure/store";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { PublicKeys } from "@/src/utils/PublicKeys";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { usePaymentProcess } from "../payment-process/usePaymentProcess";

interface IConfirmPaymentParams {
  useStripe: Stripe;
  useElements: StripeElements;
}

interface IUseStripe {
  userStripe: IStripePrimitives;
  storeStripe(stripe: IStripePrimitives): void;
  payWithExistingCard(): Promise<void>;
  payWithNewCard(): Promise<string>;
  confirmPayment(params: IConfirmPaymentParams): Promise<void>;
  confirmSetupIntent(params: IConfirmPaymentParams): Promise<void>;
  setupIntentClientSecret(): Promise<string>;
  removePM(pmId: string): Promise<void>;
}

//? https://stripe.com/docs/payments/quickstart
//? https://stripe.com/docs/payments/save-during-payment?platform=web&client=react#web-submit-payment

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export const stripePromise = loadStripe(PublicKeys.stripe);

export const useUserStripe = (): IUseStripe => {
  const { setNotification } = useNotification();
  const { removeStripePM, saveNewStripePM, storeStripe } = stripeSliceActions;
  const userStripe = useSelector((state: TStateStripe) => state.stripe.stripe);
  const dispatch = useDispatch<AppDispatch>();
  const { storePaymentMethod, state, index, removeDetails } =
    usePaymentProcess();

  const payWithExistingCard = async (): Promise<void> => {
    try {
      await payWithStripeHandler.withPMethod({
        budgetItem: index,
        adId: state.ad.id,
        paymentMethod: state.paymentMethod,
      });
      setNotification({ message: "Campaña lanzada!", status: "success" });
      removeDetails();
      return;
    } catch (err) {
      setNotification({ message: "Algo no fue bien", status: "error" });
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("Something went wrong while paying");
    }
  };

  const payWithNewCard = async (): Promise<string> => {
    try {
      const secret = await payWithStripeHandler.withoutPMethod({
        budgetItem: index,
        adId: state.ad.id,
      });
      removeDetails();
      return secret.clientSecret;
    } catch (err) {
      setNotification({ message: "Algo no fue bien", status: "error" });
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("Something went wrong while paying with new card");
    }
  };

  const setupIntentClientSecret = async (): Promise<string> => {
    return await setupIntentClientHandler.get();
  };

  const confirmSetupIntent = async (
    params: IConfirmPaymentParams
  ): Promise<void> => {
    const { useElements, useStripe } = params;
    const data = await useStripe.confirmSetup({
      elements: useElements,
      redirect: "if_required",
    });
    const pm = data.setupIntent!.payment_method;
    await dispatch(saveNewStripePM(pm!.toString()));
  };

  const confirmPayment = async (
    params: IConfirmPaymentParams
  ): Promise<void> => {
    const { useElements, useStripe } = params;
    try {
      await useStripe.confirmPayment({
        elements: useElements,
        redirect: "if_required",
        /*  confirmParams: {
          return_url: path,
        }, */
      });
      setNotification({ message: "Pago completado!", status: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Algo no fue bien", status: "error" });
    }
  };

  return {
    userStripe,
    storeStripe: (stripe: IStripePrimitives) => {
      dispatch(storeStripe({ stripe }));
      if (!stripe.paymentMethods[0]) return;
      const pmId = stripe.paymentMethods[0].paymentMethodId;
      storePaymentMethod(pmId);
    },
    payWithExistingCard,
    payWithNewCard,
    confirmPayment,
    confirmSetupIntent,
    setupIntentClientSecret,
    removePM: async (pmId: string) => {
      await dispatch(removeStripePM(pmId));
    },
  };
};
