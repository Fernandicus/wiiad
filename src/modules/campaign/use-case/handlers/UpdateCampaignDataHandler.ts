import { UniqId } from "@/src/common/domain/UniqId";
import { UpdateCampaignData } from "../UpdateCampaignData";

export class UpdateCampaignDataHandler {
  constructor(private updateMetrics: UpdateCampaignData) {}

  async addReferral(params: {
    referralId: string;
    campaignId: string;
  }): Promise<void> {
    const referralUniqId = new UniqId(params.referralId);
    const campaignUniqId = new UniqId(params.campaignId);
    await this.updateMetrics.addReferral({
      campaignId: campaignUniqId,
      referralId: referralUniqId,
    });
  }

  async increaseViews(campaignId: string): Promise<void> {
    const id = new UniqId(campaignId);
    await this.updateMetrics.increaseViews(id);
  }

  async increaseClicks(campaignId: string): Promise<void> {
    const id = new UniqId(campaignId);
    await this.updateMetrics.increaseClicks(id);
  }
}
