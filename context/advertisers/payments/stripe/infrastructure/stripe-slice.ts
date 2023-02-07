import { createSlice } from "@reduxjs/toolkit";
import { initStripeState } from "../domain/InitStripeState";
import { stripeReducers } from "../use-case/stripe-reducers";

export const stripeSlice = createSlice({
  name: "stripe",
  initialState: initStripeState,
  reducers: stripeReducers,
});

export const { storeStripeReducer, removePMStripeReducer } = stripeSlice.actions;
