import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { IAdvertiserApiCall } from "../domain/interfaces/IAdvertiserApiCall";

export class GetCampaigns {
  constructor(private apiCall: IAdvertiserApiCall) {}

  async getAll(): Promise<Campaign[]> {
    const campaigns = await this.apiCall.getCampaigns();
    return campaigns;
  }
}
