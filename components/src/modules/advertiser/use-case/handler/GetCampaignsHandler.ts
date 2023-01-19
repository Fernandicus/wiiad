import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { UniqId } from "@/src/utils/UniqId";
import { GetCampaigns } from "../GetCampaigns";

export class GetCampaignsHandler {
  constructor(private getCampaigns: GetCampaigns) {}

  async getAll(): Promise<ICampaignPrimitives[]> {
    const campaigns = await this.getCampaigns.getAll();
    return campaigns.map((campaign) => campaign.toPrimitives());
  }
}
