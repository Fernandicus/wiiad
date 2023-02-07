import { IStoreStripeAction, IRemovePMStripeAction } from "../domain/interfaces/IStripeAction";
import { IStripeState } from "../domain/interfaces/IStripeState";

const storeStripeReducer = (state: IStripeState, action: IStoreStripeAction) => {
  state.stripe = action.payload.stripe;
};

const removePMStripeReducer = (state: IStripeState, action: IRemovePMStripeAction) => {
  const index = state.stripe.paymentMethods.findIndex(
    (stripe) => stripe.paymentMethodId == action.payload.pmId
  );
  state.stripe.paymentMethods.splice(index, 1);
};

export const stripeReducers = {
  storeStripeReducer,
  removePMStripeReducer
};
