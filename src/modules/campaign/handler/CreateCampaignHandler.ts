import { UniqId } from "@/src/utils/UniqId";
import { Campaign } from "../domain/Campaign";
import { CreateCampaign } from "../use-case/CreateCampaign";

export class CreateCampaignHandler {
  constructor(private createCampaign: CreateCampaign) {}

  async launch(props: {
    advertiserId: string;
    adId: string;
    id: string;
  }): Promise<void> {
    const { advertiserId, adId, id } = props;

    const campaign = Campaign.new({
      id: new UniqId(id),
      advertiserId: new UniqId(advertiserId),
      adId: new UniqId(adId),
    });

    await this.createCampaign.launch(campaign);
  }
}
