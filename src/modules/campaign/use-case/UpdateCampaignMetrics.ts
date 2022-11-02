import { UniqId } from "@/src/utils/UniqId";
import { ICampaignRepo } from "../domain/ICampaignRepo";

export class UpdateCampaignMetrics {
  constructor(private campaignRepo: ICampaignRepo) {}

  async addWatcher(params: {
    watcherId: UniqId;
    campaignId: UniqId;
  }): Promise<void> {
    await this.campaignRepo.addWatcher({
      campaignId: params.campaignId.id,
      watcherId: params.watcherId.id,
    });
  }

  async addReferral(params: {
    referralId: UniqId;
    campaignId: UniqId;
  }): Promise<void> {
    await this.campaignRepo.addReferral({
      campaignId: params.campaignId.id,
      referralId: params.referralId.id,
    });
  }

  async increaseViews(campaignId: UniqId): Promise<void> {
    await this.campaignRepo.increaseViews(campaignId.id);
  }

  async increaseClicks(campaignId: UniqId): Promise<void> {
    await this.campaignRepo.increaseClicks(campaignId.id);
  }
}
