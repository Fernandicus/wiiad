import { IRemoveBudgetDetailsAction, IStoreBudgetDetailsAction, IStorePaymentMethodAction } from "../domain/interfaces/IPaymentProcessAction";
import { IStoreBudgetDetailsState, IStorePaymentMethodState } from "../domain/interfaces/IPaymentProcessState";

const storeBudgetDetails = (
  state: IStoreBudgetDetailsState,
  action: IStoreBudgetDetailsAction
) => {
  state.budget = action.payload.budget;
};

const storePaymentMethod = (
  state: IStorePaymentMethodState,
  action: IStorePaymentMethodAction
) => {
  state.paymentMethod = action.payload.paymentMethod;
};

const removeBudgetDetails = (
  state: IStoreBudgetDetailsState,
  action: IRemoveBudgetDetailsAction
) => {
  state = { ...state, budget: { amount: 0, clicks: 0, pricePerClick: 0 } };
};

export const paymentProcessReducers = {
  storeBudgetDetails,
  storePaymentMethod,
  removeBudgetDetails,
};
