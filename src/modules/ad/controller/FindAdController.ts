import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { userSession } from "@/src/use-case/container";
import { adFinderHandler } from "../ad-container";
import { AdPropsPrimitives } from "../domain/Ad";
import { ErrorFindingAd } from "../domain/ErrorFindingAd";

export class FindAdController {
  static async findAll(context: IReqAndRes): Promise<AdPropsPrimitives[]> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorFindingAd("No Auth");

    const adsFound = await adFinderHandler.findAll(session.id);
    return adsFound;
  }
}
