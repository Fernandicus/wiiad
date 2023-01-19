import { Balance } from "@/src/common/domain/Balance";
import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFetchingCampaigns } from "../domain/interfaces/ErrorFetchingCampaigs";
import { ICampaignsApiCall } from "../domain/interfaces/ICampaignsApiCall";

export class FetchCampaignsApiCalls implements ICampaignsApiCall {
  async getAll(): Promise<Campaign[]> {
    const resp = await fetch(ApiRoutes.advertiserCampaigns, { method: "GET" });
    if (resp.status !== 200)
      throw ErrorFetchingCampaigns.gettingAll()
    const campaignsPrimitives = await this.getCampaigns(resp);
    return this.toCampaign(campaignsPrimitives);
  }

  private async getCampaigns(
    response: Response
  ): Promise<ICampaignPrimitives[]> {
    const respJSON = await response.json();
    return respJSON["campaigns"] as ICampaignPrimitives[];
  }

  private toCampaign(campaigns: ICampaignPrimitives[]): Campaign[] {
    return campaigns.map((campaign) => {
      return new Campaign({
        id: new UniqId(campaign.id),
        adId: new UniqId(campaign.adId),
        advertiserId: new UniqId(campaign.advertiserId),
        budget: new CampaignBudget({
          balance: new Balance(campaign.budget.balance),
          clicks: campaign.budget.clicks,
        }),
        metrics: new CampaignMetrics({
          totalClicks: campaign.metrics.totalClicks,
          totalViews: campaign.metrics.totalViews,
        }),
        referrals: campaign.referrals.map((ref) => new UniqId(ref)),
        status: new CampaignStatus(campaign.status),
      });
    });
  }
}
