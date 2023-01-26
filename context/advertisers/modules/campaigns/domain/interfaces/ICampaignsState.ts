import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
2;
export interface ICampaignsState
  extends IStoreCampaignsState,
    IRemoveCampaignsState {}

export interface IStoreCampaignsState {
  campaigns: ICampaignPrimitives[];
}

export interface IRemoveCampaignsState {
  adId: string;
  campaigns: ICampaignPrimitives[];
}
