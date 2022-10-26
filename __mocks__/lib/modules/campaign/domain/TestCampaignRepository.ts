import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export interface TestCampaignRepository {
  saveMany(campaigns: ICampaignPrimitives[]): Promise<void>;
  getByStatus(status: string): Promise<ICampaignPrimitives[] | null>;
}
