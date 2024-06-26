import { Campaign } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/interfaces/ICampaignRepo";

export class CreateCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async launch(campaign: Campaign): Promise<void> {
    await this.campaignRepo.save(campaign);
  }
}
