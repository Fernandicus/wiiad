import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { adRemoverHandler } from "../ad-container";
import { ErrorRemovingAd } from "../../domain/errors/ErrorRemovingAd";

export class RemoveAdController {
  static async remove(context: IReqAndRes, adId: string): Promise<void> {
    const session = userSession.getFromServer(context);
    if (!session) throw new ErrorRemovingAd("No auth");
    await adRemoverHandler.remove(adId);
  }
}
