import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { adFinderHandler } from "../ad-container";
import { AdPropsPrimitives } from "../../domain/Ad";
import { ErrorFindingAd } from "../../domain/errors/ErrorFindingAd";

export class FindAdController {
  static async findAll(context: IReqAndRes): Promise<AdPropsPrimitives[]> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorFindingAd("No Auth");

    const adsFound = await adFinderHandler.findAll(session.id);
    return adsFound;
  }
}
