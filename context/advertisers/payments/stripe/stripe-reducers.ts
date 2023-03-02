import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { PayloadAction } from "@reduxjs/toolkit";

interface IStripeState {
  stripe: IStripePrimitives;
}

export const initStripeState: IStripeState = {
  stripe: {
    id: "",
    userId: "",
    customerId: "",
    paymentMethods: [],
  },
};

export const storeStripeReducer = (
  state: IStripeState,
  action: PayloadAction<IStripeState>
) => {
  state.stripe = action.payload.stripe;
};

export const saveNewStripePMReducer = (
  state: IStripeState,
  action: PayloadAction<ICardDetailsPrimitives>
) => {
  state.stripe.paymentMethods.push(action.payload);
};

export const removeStripePMReducer = (
  state: IStripeState,
  action: PayloadAction<{ pmId: string }>
) => {
  const index = state.stripe.paymentMethods.findIndex(
    (stripe) => stripe.paymentMethodId == action.payload.pmId
  );
  state.stripe.paymentMethods.splice(index, 1);
};
