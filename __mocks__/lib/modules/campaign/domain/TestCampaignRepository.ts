import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";

export interface TestCampaignRepository {
  saveMany(campaigns: Campaign[]): Promise<void>;
  getByStatus(status: CampaignStatus): Promise<Campaign[] | null>;
  findById(id: UniqId): Promise<Campaign | null>;
}
