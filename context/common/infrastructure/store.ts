import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { IAdvertiserStore } from "context/advertisers/common/domain/interfaces/IAdvertiserStore";
import { adsSlice } from "context/advertisers/modules/ads/infrastructure/ads-slices";
import { campaignsSlice } from "../../advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { advertiserStatusSlices } from "context/advertisers/modules/status/infrastructure/status-slices";
import { stripeSlice } from "context/advertisers/modules/payments/stripe/infrastructure/stripe-slice";

type TReducer = Reducer<any, AnyAction>;

//? Extend more interfaces to add more reducers to the store
interface IStore extends IAdvertiserStore<TReducer> {}

const reducer: IStore = {
  campaigns: campaignsSlice.reducer,
  ads: adsSlice.reducer,
  status: advertiserStatusSlices.reducer,
  stripe: stripeSlice.reducer,
};

export const store = configureStore({ reducer });
