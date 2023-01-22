import { IStripeAction } from "../domain/interfaces/IStripeAction";
import { IStripeState } from "../domain/interfaces/IStripeState";

const initStoreStripeReducer = (state: IStripeState, action: IStripeAction) => {
  if (state.stripe.customerId)
    throw new Error("Stripe state is already initialized");
  state.stripe = action.payload.stripe;
};

export const stripeReducers = {
  initStoreStripeReducer,
};
