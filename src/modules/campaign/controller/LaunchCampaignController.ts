import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { createCampaignHandler } from "../container";
import { ErrorCreatingCampaign } from "../domain/value-objects/ErrorCreatingCampaign";

export class LaunchCampaignController {
  static async launch(context: IReqAndRes, adId: string): Promise<void> {
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorCreatingCampaign("Missing session");
    await createCampaignHandler.launch({ advertiserId: session.id, adId });
  }
}
