import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { IAdvertiserStore } from "context/advertisers/common/domain/interfaces/IAdvertiserStoreState";
import { adsSlice } from "context/advertisers/modules/ads/infrastructure/ads-slices";
import { campaignsSlice } from "../../advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { advertiserStatusSlices } from "context/advertisers/modules/status/infrastructure/status-slices";

type TReducer = Reducer<any, AnyAction>;

//* Extend more interfaces to add more reducers to the store
interface IStore<T> extends IAdvertiserStore<T> {}

const reducer: IStore<TReducer> = {
  campaigns: campaignsSlice.reducer,
  ads: adsSlice.reducer,
  status: advertiserStatusSlices.reducer,
};

export const store = configureStore({ reducer });
