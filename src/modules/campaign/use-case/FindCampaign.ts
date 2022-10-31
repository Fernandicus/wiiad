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
    return this.toCampaign(activeCampaigns);
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[] | null> {
    const campaignsFound = await this.campaignRepo.findAllByAdvertiserId(id.id);
    if (campaignsFound.length == 0) return null;
    return this.toCampaign(campaignsFound);
  }

  private toCampaign(campaignsPrimitives: ICampaignPrimitives[]): Campaign[] {
    return campaignsPrimitives.map((campaign): Campaign => {
      return new Campaign({
        id: new UniqId(campaign.id),
        adId: new UniqId(campaign.adId),
        advertiserId: new UniqId(campaign.advertiserId),
        status: new CampaignStatus(campaign.status),
        budget: new CampaignBudget(campaign.budget),
        metrics: new CampaignMetrics(campaign.metrics),
        promoters: campaign.promoters.map((promoter): UniqId => {
          return new UniqId(promoter);
        }),
        watchers: campaign.watchers.map((watcher): UniqId => {
          return new UniqId(watcher);
        }),
      });
    });
  }
}
