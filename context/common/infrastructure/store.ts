import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { IAdvertiserStore } from "@/context/advertisers/common/domain/interfaces/IAdvertiserStore";
import { adsSlice } from "@/context/advertisers/ads/infrastructure/ads-slices";
import { campaignsSlice } from "@/context/advertisers/campaigns/infrastructure/campaigns-slices";
import { advertiserSessionSlices } from "@/context/advertisers/status/infrastructure/session-slices";
import { stripeSlice } from "@/context/advertisers/payments/stripe/infrastructure/stripe-slice";
import { paymentProcessSlice } from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";

type TReducer = Reducer<any, AnyAction>;

//? Extend more interfaces to add more reducers to the store
interface IStore extends IAdvertiserStore<TReducer> {}

const reducer: IStore = {
  campaigns: campaignsSlice.reducer,
  ads: adsSlice.reducer,
  session: advertiserSessionSlices.reducer,
  stripe: stripeSlice.reducer,
  paymentProcess: paymentProcessSlice.reducer,
};

export const store = configureStore({ reducer });
