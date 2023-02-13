import { configureStore } from "@reduxjs/toolkit";
import { advertiserSessionSlices } from "@/context/advertisers/status/infrastructure/session-slices";
import { stripeSliceReducer } from "@/context/advertisers/payments/stripe/stripe-slice";
import { paymentProcessSlice } from "@/context/advertisers/payments/payment-process/infrastructure/payment-process-slices";
import { notificationSlice } from "@/context/notifications/infrastructure/notification-slice";
import { adsSliceReducer } from "@/context/advertisers/ads/ads-slices";
import { campaignsSliceReducer } from "@/context/advertisers/campaigns/campaigns-slices";

const reducer = {
  campaigns: campaignsSliceReducer,
  ads: adsSliceReducer,
  session: advertiserSessionSlices.reducer,
  stripe: stripeSliceReducer,
  paymentProcess: paymentProcessSlice.reducer,
  notification: notificationSlice.reducer,
};

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TStripeState = Pick<RootState, "stripe">;
export type TAdsState = Pick<RootState, "ads">;
export type TCampaignsState = Pick<RootState, "campaigns">;
