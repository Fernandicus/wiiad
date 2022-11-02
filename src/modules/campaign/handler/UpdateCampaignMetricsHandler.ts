import { UniqId } from "@/src/utils/UniqId";
import { UpdateCampaignMetrics } from "../use-case/UpdateCampaignMetrics";

export class UpdateCampaignMetricsHandler {
  constructor(private updateMetrics: UpdateCampaignMetrics) {}

  async addWatcher(params: {
    watcherId: string;
    campaignId: string;
  }): Promise<void> {
    const waticherUniqId = new UniqId(params.watcherId);
    const campaignUniqId = new UniqId(params.campaignId);
    await this.updateMetrics.addWatcher({
      campaignId: campaignUniqId,
      watcherId: waticherUniqId,
    });
  }

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
