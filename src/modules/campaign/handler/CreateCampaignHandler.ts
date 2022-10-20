import { Campaign } from "../domain/Campaign";
import { CreateCampaign } from "../use-case/CreateCampaign";

export class CreateCampaignHandler {
  constructor(private createCampaign: CreateCampaign) {}

  async launch(props: {
    advertiserId: string;
    adId: string;
  }): Promise<void> {

    const { advertiserId, adId } = props;

    const campaign = Campaign.new({
      advertiserId,
      adId,
    });

    await this.createCampaign.launch(campaign);
  }
}
