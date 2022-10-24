import { UniqId } from "@/src/utils/UniqId";
import { Campaign } from "../domain/Campaign";
import {
  CampaignBudget,
  CampaignBudgetProps,
} from "../domain/value-objects/Budget";
import { CreateCampaign } from "../use-case/CreateCampaign";

export class CreateCampaignHandler {
  constructor(private createCampaign: CreateCampaign) {}

  async launch(props: {
    advertiserId: string;
    adId: string;
    id: string;
    budget: CampaignBudgetProps;
  }): Promise<void> {
    const { advertiserId, adId, id, budget } = props;
    const campaignBudget = new CampaignBudget({
      moneyToSpend: budget.moneyToSpend,
      maxClicks: budget.maxClicks,
    });
    const campaign = Campaign.new({
      id: new UniqId(id),
      advertiserId: new UniqId(advertiserId),
      adId: new UniqId(adId),
      budget: campaignBudget,
    });

    await this.createCampaign.launch(campaign);
  }
}
