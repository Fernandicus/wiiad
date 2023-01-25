import {
  IRemoveAdAction,
  IStoreAdsAction,
} from "../domain/interfaces/IAdsAction";
import { IRemoveAdState, IStoreAdsState } from "../domain/interfaces/IAdsState";

const storeAdsReducer = (state: IStoreAdsState, action: IStoreAdsAction) => {
  const newAds = action.payload.ads;
  newAds.forEach((ad) => {
    state.ads.push(ad);
  });
};

const removeAdReducer = (state: IRemoveAdState, action: IRemoveAdAction) => {
  const index = state.ads.findIndex((ad) => ad.id == action.payload.adId);
  state.ads.splice(index, 1);
};

export const adsReducers = {
  storeAdsReducer,
  removeAdReducer,
};
