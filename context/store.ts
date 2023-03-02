import { configureStore } from "@reduxjs/toolkit";
import { stripeSliceReducer } from "@/context/advertisers/payments/stripe/stripe-slice";
import { paymentProcessSliceReducer } from "@/context/advertisers/payments/payment-process/payment-process-slices";
import { notificationSliceReducer } from "@/context/notifications/notification-slice";
import { adsSliceReducer } from "@/context/advertisers/ads/ads-slices";
import { campaignsSliceReducer } from "@/context/advertisers/campaigns/campaigns-slices";
import { userSlicesReducer } from "./user/session/session-slice";
import { referralSliceReducer } from "./user/referral/referral-slice";

const reducer = {
  campaigns: campaignsSliceReducer,
  ads: adsSliceReducer,
  userSession: userSlicesReducer,
  stripe: stripeSliceReducer,
  paymentProcess: paymentProcessSliceReducer,
  notification: notificationSliceReducer,
  referral: referralSliceReducer,
};

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TStripeState = Pick<RootState, "stripe">;
export type TAdsState = Pick<RootState, "ads">;
export type TCampaignsState = Pick<RootState, "campaigns">;
export type TPaymentProcessState = Pick<RootState, "paymentProcess">;
export type TUserState = Pick<RootState, "userSession">;
export type TNotificationState = Pick<RootState, "notification">;
export type TReferralState = Pick<RootState, "referral">;
