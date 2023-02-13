import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IStoreBudgetDetailsState {
  amount: number;
  clicks: number;
  pricePerClick: number;
}

export interface IPaymentProcessState {
  budget: IStoreBudgetDetailsState;
  paymentMethod: string;
  ad: AdPropsPrimitives;
}

export const paymentProcessInitialState: IPaymentProcessState = {
  budget: {
    amount: 0,
    clicks: 0,
    pricePerClick: 0,
  },
  paymentMethod: "",
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

export const storeAdToLaunchReducer = (
  state: IPaymentProcessState,
  action: PayloadAction<AdPropsPrimitives>
) => {
  state.ad = action.payload;
};

export const storeBudgetDetailsReducer = (
  state: IPaymentProcessState,
  action: PayloadAction<IStoreBudgetDetailsState>
) => {
  state.budget = action.payload;
};

export const storePaymentMethodReducer = (
  state: IPaymentProcessState,
  action: PayloadAction<string>
) => {
  state.paymentMethod = action.payload;
};

export const removeDetailsReducer = (
  state: IPaymentProcessState,
  action: PayloadAction
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
