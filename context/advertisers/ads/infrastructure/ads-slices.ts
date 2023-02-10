import {
  createAdHandler,
  removeAdHandler,
} from "@/components/src/advertiser/ads/infrastructure/ads-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adsInitialState } from "../domain/AdInitialState";
import { IRemoveAdState, IStoreAdsState } from "../domain/interfaces/IAdsState";
import { adsReducers } from "../use-case/ads-reducer";

export const createAd = createAsyncThunk(
  "ads/create",
  async (ad: AdPropsPrimitives) => {
    await createAdHandler.create(ad);
  }
);

export const removeAd = createAsyncThunk("ads/remove", async (adId: string) => {
  await removeAdHandler.remove(adId);
});

export const adsSlice = createSlice({
  name: "ads",
  initialState: adsInitialState,
  reducers: adsReducers,
  extraReducers: (builtinModules) => {
    builtinModules

      .addCase(createAd.fulfilled, (state, action) => {
        const type = action.type;
        const payload: IStoreAdsState = { ads: [action.meta.arg] };
        adsReducers.storeAdsReducer(state, { type, payload });
      })

      .addCase(removeAd.fulfilled, (state, action) => {
        const type = action.type;
        const payload: IRemoveAdState = { adId: action.meta.arg };
        adsReducers.removeAdReducer(state, { type, payload });
      });
  },
});

export const { storeAdsReducer, removeAdReducer } = adsSlice.actions;
