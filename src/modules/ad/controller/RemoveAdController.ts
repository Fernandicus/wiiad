import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { adRemoverHandler } from "../ad-container";
import { ErrorRemovingAd } from "../domain/ErrorRemovingAd";

export class RemoveAdController {
  static async remove(context: IReqAndRes, adId: string): Promise<void> {
    if (!adId) throw new ErrorRemovingAd("Ad id is mandatory");
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorRemovingAd("No auth");
    await adRemoverHandler.remove(adId);
  }
}
