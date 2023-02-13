import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAdsState {
  ads: AdPropsPrimitives[];
}

export const adsInitialState: IAdsState = {
  ads: [],
};

export const storeAdsReducer = (
  state: IAdsState,
  action: PayloadAction<IAdsState>
) => {
  const newAds = action.payload.ads;
  newAds.forEach((ad) => {
    state.ads.push(ad);
  });
};

export const removeAdReducer = (
  state: IAdsState,
  action: PayloadAction<{ adId: string }>
) => {
  const index = state.ads.findIndex((ad) => ad.id == action.payload.adId);
  state.ads.splice(index, 1);
};
