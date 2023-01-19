import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ICampaignsApiCall } from "../domain/interfaces/ICampaignsApiCall";

export class GetCampaigns {
  constructor(private apiCall: ICampaignsApiCall) {}

  async getAll(): Promise<Campaign[]> {
    const campaigns = await this.apiCall.getAll();
    return campaigns;
  }
}
