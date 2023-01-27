import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export interface IAdsState {
  ads: AdPropsPrimitives[];
  adId: string;
}

export interface IStoreAdsState{
  ads: AdPropsPrimitives[];
}

export interface IRemoveAdState{
  ads: AdPropsPrimitives[];
  adId: string;
}