import { Campaign, ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";

export interface TestCampaignRepository {
  saveMany(campaigns: Campaign[]): Promise<void>;
  getByStatus(status: CampaignStatus): Promise<Campaign[] | null>;
}
