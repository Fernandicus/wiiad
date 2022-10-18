import { IReqAndRes } from "../domain/IAuthCookies";
import { IUser } from "../domain/IUser";
import { ValidateLoginQueries } from "../domain/ValidateLoginQueries";
import { adFinderHandler } from "../modules/ad/ad-container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { findAdvertiserHandler } from "../modules/advertiser/advertiser-container";
import { userSession } from "../use-case/container";

export interface IVisitProfile {
  isWatchingAd: boolean;
  user: IUser;
  ads: AdPropsPrimitives[];
}

export class WatchAdController {
  static async check(
    context: IReqAndRes,
    loginQueries: ValidateLoginQueries
  ): Promise<IVisitProfile> {
    const session = userSession.getFromServer(context);
    if (!session || session.name !== loginQueries.userName) {
      const advertiser = await findAdvertiserHandler.findByUserName(
        loginQueries.userName
      );
      const ads = await adFinderHandler.findAll(advertiser!.id);
      return {
        ads,
        isWatchingAd: true,
        user: { ...session } as IUser,
      };
    } else {
      return {
        ads: [],
        isWatchingAd: false,
        user: { ...session } as IUser,
      };
    }
  }
}
