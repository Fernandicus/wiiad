import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { IAdvertiserStore } from "store/advertisers/common/domain/interfaces/IAdvertiserStoreState";
import { adsSlice } from "store/advertisers/modules/ads/infrastructure/ads-slices";
import { campaignsSlice } from "../../advertisers/modules/campaigns/slices/campaigns-slices";

type TReducer = Reducer<any, AnyAction>;

//* Extend more interfaces to add more reducers to the store
interface IStore<T> extends IAdvertiserStore<T> {}

const reducer: IStore<TReducer> = {
  campaigns: campaignsSlice.reducer,
  ads: adsSlice.reducer,
};

export const store = configureStore({ reducer });
