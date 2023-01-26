import { UniqId } from "@/src/utils/UniqId";
import { RemoveCampaign } from "../RemoveCampaign";

export class RemoveCampaignHandler {
  constructor(private removeCampaign: RemoveCampaign) {}

  async byAdId(id: string): Promise<void> {
    const adId = new UniqId(id);
    await this.removeCampaign.byAdId(adId);
  }
}
