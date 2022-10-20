import { UniqId } from "@/src/utils/UniqId";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";

export class CreateCampaign {
  constructor(private campaignRepo: ICampaignRepo) {}

  async launch(campaign: Campaign): Promise<void> {
    const campaignPrimitives = campaign.toPrimitives()
    await this.campaignRepo.launch(campaignPrimitives);
  }
}
