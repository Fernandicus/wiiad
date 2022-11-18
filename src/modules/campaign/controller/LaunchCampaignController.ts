import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { createCampaignHandler } from "../container";
import {
  CampaignBudget,
  CampaignBudgetProps,
  ICampaignBudgetPrimitives,
} from "../domain/value-objects/Budget";
import { ErrorCreatingCampaign } from "../domain/value-objects/ErrorCreatingCampaign";

export class LaunchCampaignController {
  static async launch(props: {
    adId: string;
    budget: ICampaignBudgetPrimitives;
    advertiserId: string;
    id: string;
  }): Promise<void> {
    const { adId, advertiserId, id } = props;
    await createCampaignHandler.launch({
      id,
      adId,
      advertiserId,
      budget: props.budget,
    });
  }
}
