import {
  apiCallRemovePMHandler,
  getCardDetailsHandler,
  saveNewPMHandler,
} from "@/components/src/payments/stripe/infrastructure/pay-with-stripe-container";
import { RootState } from "@/context/common/infrastructure/store";
import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  initStripeState,
  removeStripePMReducer,
  saveNewStripePMReducer,
  storeStripeReducer,
} from "./stripe-reducers";

const saveNewStripePM = createAsyncThunk(
  "stripe/saveNewPM",
  async (paymentMethodId: string): Promise<ICardDetailsPrimitives> => {
    await saveNewPMHandler.save(paymentMethodId);
    return await getCardDetailsHandler.getDetails(paymentMethodId);
  }
);

const removeStripePM = createAsyncThunk(
  "stripe/removePM",
  async (paymentMethodId: string): Promise<{pmId:string}> => {
    await apiCallRemovePMHandler.remove(paymentMethodId);
    return { pmId: paymentMethodId };
  }
);

const stripeSlice = createSlice({
  name: "stripe",
  initialState: initStripeState,
  reducers: {
    storeStripe: storeStripeReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveNewStripePM.fulfilled, saveNewStripePMReducer)
      .addCase(removeStripePM.fulfilled, removeStripePMReducer);
  },
});

export const stripeSliceActions = { ...stripeSlice.actions, saveNewStripePM, removeStripePM };
export const stripeSliceReducer = stripeSlice.reducer;
