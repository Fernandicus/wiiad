import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { IStripeCtxState } from "context/advertisers/modules/payments/stripe/domain/interfaces/IStripeContext";
import { initStoreStripeReducer } from "context/advertisers/modules/payments/stripe/infrastructure/stripe-slice";
import { useDispatch, useSelector } from "react-redux";

interface IUseStripe {
  userStripe: IStripePrimitives;
  initStripeStore(stripe: IStripePrimitives): void;
}

export const useUserStripe = (): IUseStripe => {
  const userStripe = useSelector((state: IStripeCtxState) => state.stripe.stripe);
  const dispatch = useDispatch();

  return {
    userStripe,
    initStripeStore: (stripe: IStripePrimitives) => {
      dispatch(
        initStoreStripeReducer({
          stripe,
        })
      );
    },
  };
};
