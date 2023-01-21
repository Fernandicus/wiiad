import { IAdsAction } from "../domain/interfaces/IAdsAction";
import { IAdsState } from "../domain/interfaces/IAdsState";

const storeAdsReducer = (state: IAdsState, action: IAdsAction) => {
  const newAds = action.payload.ads;
  newAds.forEach((ad) => {
    state.ads.push(ad);
  });
};

export const adsReducers = {
  storeAdsReducer,
};
