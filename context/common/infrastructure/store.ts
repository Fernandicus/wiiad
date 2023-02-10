import { configureStore } from "@reduxjs/toolkit";
import { adsSlice } from "@/context/advertisers/ads/infrastructure/ads-slices";
import { campaignsSlice } from "@/context/advertisers/campaigns/infrastructure/campaigns-slices";
import { advertiserSessionSlices } from "@/context/advertisers/status/infrastructure/session-slices";
import { stripeSliceReducer } from "@/context/advertisers/payments/stripe/stripe-slice";
import { paymentProcessSlice } from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";
import { notificationSlice } from "@/context/notifications/infrastructure/notification-slice";

const reducer = {
  campaigns: campaignsSlice.reducer,
  ads: adsSlice.reducer,
  session: advertiserSessionSlices.reducer,
  stripe: stripeSliceReducer,
  paymentProcess: paymentProcessSlice.reducer,
  notification: notificationSlice.reducer,
};

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TStateStripe = Pick<RootState, "stripe">;
