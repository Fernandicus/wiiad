import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { Campaign } from "../../domain/Campaign";
import {
  CampaignBudget,
  ICampaignBudgetPrimitives,
} from "../../domain/value-objects/Budget";
import { Clicks } from "../../domain/value-objects/Clicks";
import { CreateCampaign } from "../CreateCampaign";

interface ILaunchCampaignProps {
  advertiserId: string;
  adId: string;
  id: string;
  budget: ICampaignBudgetPrimitives;
}

export class CreateCampaignHandler {
  constructor(private createCampaign: CreateCampaign) {}

  async launch({
    advertiserId,
    adId,
    id,
    budget,
  }: ILaunchCampaignProps): Promise<void> {
    const campaignBudget = new CampaignBudget({
      balance: new Balance(budget.balance),
      clicks: new Clicks(budget.clicks),
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
