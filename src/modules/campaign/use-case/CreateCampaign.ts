import { UniqId } from "@/src/utils/UniqId";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";

export class CreateCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async launch(campaign: Campaign): Promise<void> {
    const campaignPrimitives: ICampaignPrimitives = {
      id: campaign.id.id,
      adId: campaign.adId.id,
      advertiserId: campaign.advertiserId.id,
      promoters: campaign.promoters.map((promoter) => promoter.id),
      watchers: campaign.watchers.map((watcher) => watcher.id),
      budget: {
        maxClicks: campaign.budget.maxClicks,
        moneyToSpend: campaign.budget.moneyToSpend,
      },
      metrics: {
        totalClicks: campaign.metrics.totalClicks,
        totalViews:  campaign.metrics.totalViews,
      },
      status: campaign.status,
    };
    this.campaignRepo.launch(campaignPrimitives);
  }
}
