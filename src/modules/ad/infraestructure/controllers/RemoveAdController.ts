import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { adRemoverHandler } from "../ad-container";
import { ErrorRemovingAd } from "../../domain/errors/ErrorRemovingAd";
import { removeCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { ErrorRemovingCampaign } from "@/src/modules/campaign/domain/errors/ErrorRemovingCampaign";

export class RemoveAdController {
  static async remove(context: IReqAndRes, adId: string): Promise<void> {
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorRemovingAd("No auth");
    await adRemoverHandler.remove(adId);
  }

  static async removeAdAndCampaign(
    context: IReqAndRes,
    adId: string
  ): Promise<void> {
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorRemovingAd("No auth");

    const [adResponse, campaignResponse] = await Promise.allSettled([
      adRemoverHandler.remove(adId),
      removeCampaignHandler.byAdId(adId),
    ]);

    if (adResponse.status === "rejected")
      throw new ErrorRemovingAd(adResponse.reason);
    if (campaignResponse.status === "rejected")
      throw new ErrorRemovingCampaign(campaignResponse.reason);
  }
}
