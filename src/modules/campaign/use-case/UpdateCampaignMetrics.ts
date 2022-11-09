import { UniqId } from "@/src/utils/UniqId";
import { ICampaignRepo } from "../domain/ICampaignRepo";

export class UpdateCampaignMetrics {
  constructor(private campaignRepo: ICampaignRepo) {}

  async addReferral(params: {
    referralId: UniqId;
    campaignId: UniqId;
  }): Promise<void> {
    await this.campaignRepo.addReferral({
      campaignId: params.campaignId,
      referralId: params.referralId,
    });
  }

  async increaseViews(campaignId: UniqId): Promise<void> {
    await this.campaignRepo.increaseViews(campaignId);
  }

  async increaseClicks(campaignId: UniqId): Promise<void> {
    await this.campaignRepo.increaseClicks(campaignId);
  }
}
