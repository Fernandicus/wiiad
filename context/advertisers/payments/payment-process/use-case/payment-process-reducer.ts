import {
  IRemoveBudgetDetailsAction,
  IStoreAdToLaunchAction,
  IStoreBudgetDetailsAction,
  IStorePaymentMethodAction,
} from "../domain/interfaces/IPaymentProcessAction";
import {
  IPaymentProcessState,
  IStoreAdToLaunchState,
  IStoreBudgetDetailsState,
  IStorePaymentMethodState,
} from "../domain/interfaces/IPaymentProcessState";

const storeAdToLaunch = (
  state: IStoreAdToLaunchState,
  action: IStoreAdToLaunchAction
) => {
  state.ad = action.payload.ad;
};

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

const removeDetails = (
  state: IPaymentProcessState,
  action: IRemoveBudgetDetailsAction
) => {
  state = {
    ...state,
    budget: { amount: 0, clicks: 0, pricePerClick: 0 },
    ad: {
      advertiserId: "",
      description: "",
      file: "",
      id: "",
      redirectionUrl: "",
      segments: [],
      title: "",
    },
  };
};

export const paymentProcessReducers = {
  storeBudgetDetails,
  storePaymentMethod,
  removeDetails,
  storeAdToLaunch,
};
