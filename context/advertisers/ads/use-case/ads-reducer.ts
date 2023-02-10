import {
  IRemoveAdAction,
  IStoreAdsAction,
} from "../domain/interfaces/IAdsAction";
import { IAdsState } from "../domain/interfaces/IAdsState";

const storeAdsReducer = (state: IAdsState, action: IStoreAdsAction) => {
  const newAds = action.payload.ads;
  newAds.forEach((ad) => {
    state.ads.push(ad);
  });
};

const removeAdReducer = (state: IAdsState, action: IRemoveAdAction) => {
  const index = state.ads.findIndex((ad) => ad.id == action.payload.adId);
  state.ads.splice(index, 1);
};

export const adsReducers = {
  storeAdsReducer,
  removeAdReducer,
};
