import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignStatusType } from "../domain/value-objects/CampaignStatus";

export class FindCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async allActives(): Promise<ICampaignPrimitives[]> {
    const activeCampaigns = await this.campaignRepo.findByStatus(CampaignStatusType.ACTIVE);
    return activeCampaigns;
  }
}
