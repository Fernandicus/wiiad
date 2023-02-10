import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export interface IAdsState extends IStoreAdsState {}

export interface IStoreAdsState {
  ads: AdPropsPrimitives[];
}

export interface IRemoveAdState {
  adId: string;
}
