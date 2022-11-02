import { UniqId } from "@/src/utils/UniqId";
import { UpdateCampaignMetrics } from "../use-case/UpdateCampaignMetrics";

export class UpdateCampaignMetricsHandler {
  constructor(private updateMetrics: UpdateCampaignMetrics) {}

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
}
