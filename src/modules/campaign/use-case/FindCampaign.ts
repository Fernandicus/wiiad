import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ErrorFindingCampaign } from "../domain/ErrorFindingCampaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignBudget } from "../domain/value-objects/Budget";
import { CampaignMetrics } from "../domain/value-objects/CampaignMetrics";
import {
  CampaignStatus,
  CampaignStatusType,
} from "../domain/value-objects/CampaignStatus";

export class FindCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async allActives(): Promise<Campaign[]> {
    const activeCampaigns = await this.campaignRepo.findAllByStatus(
      CampaignStatus.active()
    );
    if (!activeCampaigns)
      throw new ErrorFindingCampaign("There are no active campaigns");
    return activeCampaigns;
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[]> {
    const campaignsFound = await this.campaignRepo.findAllByAdvertiserId(id);
    if (!campaignsFound)
      throw new ErrorFindingCampaign("The advertiser doesn't have campaigns");
    return campaignsFound;
  }

  async byId(id: UniqId): Promise<Campaign> {
    const campaignFound = await this.campaignRepo.byId(id);
    if (!campaignFound)
      throw new ErrorFindingCampaign(
        "The campaign with the given id doesn't exist"
      );
    return campaignFound;
  }
}
