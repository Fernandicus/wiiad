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
        ...campaigns,
        budget: {
          ...campaigns.budget,
        },
        watchers: [...campaigns.watchers],
        promoters: [...campaigns.promoters],
        metrics: {
          ...campaigns.metrics,
        },
      };
    });
    return campaigns;
  }
}
