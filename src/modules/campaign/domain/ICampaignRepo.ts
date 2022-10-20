import { AdvertiserPropsPrimitives } from "../../advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "./Campaign";
import { CampaignStatusType } from "./value-objects/CampaignStatus";

export interface ICampaignRepo {
  launch(campaign: ICampaignPrimitives): Promise<void>;
  findByStatus(status: CampaignStatusType):Promise<ICampaignPrimitives | null>;
  findByAdvertiserId(id: string):Promise<ICampaignPrimitives | null>;
}