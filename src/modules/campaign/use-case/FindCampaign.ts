import { UniqId } from "@/src/utils/UniqId";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignBudget } from "../domain/value-objects/Budget";
import { CampaignMetrics } from "../domain/value-objects/CampaignMetrics";
import {
  CampaignStatus,
  CampaignStatusType,
} from "../domain/value-objects/CampaignStatus";

export class FindCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async allActives(): Promise<Campaign[] | null> {
    const activeCampaigns = await this.campaignRepo.findByStatus(
      CampaignStatusType.ACTIVE
    );
    if (activeCampaigns.length == 0) return null;
    return this.mapToCampaign(activeCampaigns);
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[] | null> {
    const campaignsFound = await this.campaignRepo.findAllByAdvertiserId(id.id);
    if (campaignsFound.length == 0) return null;
    return this.mapToCampaign(campaignsFound);
  }

  async byId(id: UniqId): Promise<Campaign | null> {
    const campaignFound = await this.campaignRepo.byId(id.id);
    if (!campaignFound) return null;
    return this.toCampaign(campaignFound);
  }

  private toCampaign(campaignPrimitives: ICampaignPrimitives): Campaign {
    return new Campaign({
      id: new UniqId(campaignPrimitives.id),
      adId: new UniqId(campaignPrimitives.adId),
      advertiserId: new UniqId(campaignPrimitives.advertiserId),
      status: new CampaignStatus(campaignPrimitives.status),
      budget: new CampaignBudget(campaignPrimitives.budget),
      metrics: new CampaignMetrics(campaignPrimitives.metrics),
      promoters: campaignPrimitives.promoters.map((promoter): UniqId => {
        return new UniqId(promoter);
      }),
      watchers: campaignPrimitives.watchers.map((watcher): UniqId => {
        return new UniqId(watcher);
      }),
    });
  }

  private mapToCampaign(
    campaignsPrimitives: ICampaignPrimitives[]
  ): Campaign[] {
    return campaignsPrimitives.map((campaign): Campaign => {
      return this.toCampaign(campaign);
    });
  }
}
