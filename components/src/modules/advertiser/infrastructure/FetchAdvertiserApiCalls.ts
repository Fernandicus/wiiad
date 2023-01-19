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
import { ErrorFetchingAdvertiser } from "../domain/interfaces/ErrorFetchingAdvertiser";
import { IAdvertiserApiCall } from "../domain/interfaces/IAdvertiserApiCall";

export class FetchAdvertiserApiCalls implements IAdvertiserApiCall {
  async getCampaigns(): Promise<Campaign[]> {
    const resp = await fetch(ApiRoutes.advertiserCampaigns, { method: "GET" });
    if (resp.status !== 200)
      throw ErrorFetchingAdvertiser.gettingAll()
    const campaignsPrimitives = await this.responseToPrimitives(resp);
    return this.toCampaign(campaignsPrimitives);
  }

  private async responseToPrimitives(
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
