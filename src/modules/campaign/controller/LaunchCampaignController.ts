import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { createCampaignHandler } from "../container";
import { ErrorCreatingCampaign } from "../domain/value-objects/ErrorCreatingCampaign";

export class LaunchCampaignController {
  static async launch(props: {
    context: IReqAndRes;
    adId: string;
    id: string;
  }): Promise<void> {
    const { adId, context, id } = props;
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorCreatingCampaign("Missing session");
    await createCampaignHandler.launch({ id, advertiserId: session.id, adId });
  }
}
