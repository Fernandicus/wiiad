import { createCampaignHandler } from "../campaign-container";
import { ICampaignBudgetPrimitives } from "../../domain/value-objects/Budget";

export class LaunchCampaignController {
  static async launch(props: {
    adId: string;
    budget: ICampaignBudgetPrimitives;
    advertiserId: string;
    id: string;
  }): Promise<void> {
    const { adId, advertiserId, budget, id } = props;
    await createCampaignHandler.launch({
      id,
      adId,
      advertiserId,
      budget,
    });
  }
}
