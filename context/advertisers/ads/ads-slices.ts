import {
  createAdHandler,
  removeAdHandler,
} from "@/components/src/advertiser/ads/infrastructure/ads-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adsInitialState,
  removeAdReducer,
  storeAdsReducer,
} from "./ads-reducer";

export const createAd = createAsyncThunk(
  "ads/create",
  async (ad: AdPropsPrimitives): Promise<{ ad: AdPropsPrimitives }> => {
    await createAdHandler.create(ad);
    return { ad };
  }
);

export const removeAd = createAsyncThunk(
  "ads/remove",
  async (adId: string): Promise<{ adId: string }> => {
    await removeAdHandler.remove(adId);
    return { adId };
  }
);

const adsSlice = createSlice({
  name: "ads",
  initialState: adsInitialState,
  reducers: {
    storeAds: storeAdsReducer,
  },
  extraReducers: (builtinModules) => {
    builtinModules

      .addCase(createAd.fulfilled, (state, action) => {
        const payload = { ads: [action.payload.ad] };
        storeAdsReducer(state, { ...action, payload });
      })

      .addCase(removeAd.fulfilled, removeAdReducer);
  },
});

export const adsSliceActions = adsSlice.actions;
export const adsSliceReducer = adsSlice.reducer;
