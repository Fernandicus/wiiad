import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export interface ICampaignsState
  extends IStoreCampaignsState,
    IRemoveCampaignsState {}

export interface IStoreCampaignsState {
  campaigns: ICampaignPrimitives[];
}

export interface IRemoveCampaignsState {
  adId: string;
}
