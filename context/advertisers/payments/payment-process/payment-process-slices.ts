import { createSlice } from "@reduxjs/toolkit";
import {
  paymentProcessInitialState,
  removeDetailsReducer,
  storeAdToLaunchReducer,
  storeBudgetDetailsReducer,
  storePaymentMethodReducer,
} from "./payment-process-reducer";

const paymentProcessSlice = createSlice({
  name: "paymentProcess",
  initialState: paymentProcessInitialState,
  reducers: {
    removeDetails: removeDetailsReducer,
    storeAdToLaunch: storeAdToLaunchReducer,
    storeBudgetDetails: storeBudgetDetailsReducer,
    storePaymentMethod: storePaymentMethodReducer,
  },
});

export const paymentProcessSliceActions = paymentProcessSlice.actions;
export const paymentProcessSliceReducer = paymentProcessSlice.reducer;
