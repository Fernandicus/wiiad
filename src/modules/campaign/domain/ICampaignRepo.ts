import { AdvertiserPropsPrimitives } from "../../advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "./Campaign";
import { CampaignStatusType } from "./value-objects/CampaignStatus";

export interface ICampaignRepo {
  save(campaign: ICampaignPrimitives): Promise<void>;
  findByStatus(status: string): Promise<ICampaignPrimitives[]>;
  findAllByAdvertiserId(id: string): Promise<ICampaignPrimitives[]>;
  byId(id: string): Promise<ICampaignPrimitives | null>;
  addReferral(params: {
    campaignId: string;
    referralId: string;
  }): Promise<void>;
  increaseViews(id: string): Promise<void>;
  increaseClicks(id: string): Promise<void>;
}
