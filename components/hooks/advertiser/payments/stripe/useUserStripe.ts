import { IStripeCtxState } from "@/context/advertisers/payments/stripe/domain/interfaces/IStripeContext";
import { storeStripeReducer } from "@/context/advertisers/payments/stripe/infrastructure/stripe-slice";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { useDispatch, useSelector } from "react-redux";
import { usePaymentProcess } from "../payment-process/usePaymentProcess";

interface IUseStripe {
  userStripe: IStripePrimitives;
  storeStripe(stripe: IStripePrimitives): void;
}

export const useUserStripe = (): IUseStripe => {
  const { storePaymentMethod } = usePaymentProcess();
  const userStripe = useSelector(
    (state: IStripeCtxState) => state.stripe.stripe
  );
  const dispatch = useDispatch();

  return {
    userStripe,
    storeStripe: (stripe: IStripePrimitives) => {
      dispatch(
        storeStripeReducer({
          stripe,
        })
      );
      const pmId = stripe.paymentMethods[0].paymentMethodId;
      storePaymentMethod(pmId);
    },
  };
};
