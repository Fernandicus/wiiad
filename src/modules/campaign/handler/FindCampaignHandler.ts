import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ErrorFindingCampaign } from "../domain/ErrorFindingCampaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignStatusType } from "../domain/value-objects/CampaignStatus";
import { FindCampaign } from "../use-case/FindCampaign";

export class FindCampaignHandler {
  constructor(private findCampaign: FindCampaign) {}

  async allActives(): Promise<ICampaignPrimitives[]> {
    const activeCampaigns = await this.findCampaign.allActives();
    if (activeCampaigns.length == 0)
      throw new ErrorFindingCampaign("There are no active campaigns");
    const campaigns = activeCampaigns.map((campaigns): ICampaignPrimitives => {
      return {
        id: campaigns.id,
        adId: campaigns.adId,
        advertiserId: campaigns.advertiserId,
        status: campaigns.status,
        budget: {
          maxClicks: campaigns.budget.maxClicks,
          moneyToSpend: campaigns.budget.moneyToSpend
        },
        watchers: [...campaigns.watchers],
        promoters: [...campaigns.promoters],
        metrics: {
          totalClicks: campaigns.metrics.totalClicks,
          totalViews: campaigns.metrics.totalViews,
        },
      };
    });
    return campaigns;
  }
}
