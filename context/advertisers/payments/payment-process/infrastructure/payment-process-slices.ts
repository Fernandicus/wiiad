import { createSlice } from "@reduxjs/toolkit";
import { paymentProcessInitialState } from "../domain/PaymentProcessInitialState";
import { paymentProcessReducers } from "../use-case/payment-process-reducer";

export const paymentProcessSlice = createSlice({
  name: "paymentProcess",
  initialState: paymentProcessInitialState,
  reducers: paymentProcessReducers,
});

export const {
  storeBudgetDetails,
  storePaymentMethod,
  removeDetails,
  storeAdToLaunch,
} = paymentProcessSlice.actions;
