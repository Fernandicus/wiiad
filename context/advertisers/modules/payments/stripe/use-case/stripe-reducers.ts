import { IStripeAction } from "../domain/interfaces/IStripeAction";
import { IStripeState } from "../domain/interfaces/IStripeState";

const storeStripeReducer = (state: IStripeState, action: IStripeAction) => {
  state.stripe = action.payload.stripe;
};

export const stripeReducers = {
  storeStripeReducer,
};
