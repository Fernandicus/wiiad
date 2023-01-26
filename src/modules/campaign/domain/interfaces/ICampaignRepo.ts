import { UniqId } from "@/src/utils/UniqId";
import { Campaign } from "../Campaign";
import { CampaignStatus } from "../value-objects/CampaignStatus";

export interface ICampaignRepo {
  save(campaign: Campaign): Promise<void>;
  removeByAdId(adId: UniqId): Promise<void>;
  findAllByStatus(status: CampaignStatus): Promise<Campaign[] | null>;
  findAllByAdvertiserId(id: UniqId): Promise<Campaign[] | null>;
  byId(id: UniqId): Promise<Campaign | null>;
  addReferral(params: {
    campaignId: UniqId;
    referralId: UniqId;
  }): Promise<void>;
  increaseViews(id: UniqId): Promise<void>;
  increaseClicks(id: UniqId): Promise<void>;
}
