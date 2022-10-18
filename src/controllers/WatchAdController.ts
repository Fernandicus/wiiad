import { ErrorWatchingAd } from "../domain/ErrorWatchingAd";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IUser } from "../domain/IUser";
import { ValidateLoginQueries } from "../domain/ValidateLoginQueries";
import { adFinderHandler } from "../modules/ad/ad-container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { findAdvertiserHandler } from "../modules/advertiser/advertiser-container";
import { userSession } from "../use-case/container";

export interface IWatchAdData {
  user: IUser;
  watchAds: AdPropsPrimitives[];
}

export class WatchAdController {
  static async check(
    context: IReqAndRes,
    loginQueries: ValidateLoginQueries
  ): Promise<IWatchAdData> {
    const session = userSession.getFromServer(context);
    if (!session || session.name !== loginQueries.userName) {
      const advertiser = await findAdvertiserHandler.findByUserName(
        loginQueries.userName
      );
      if(!advertiser) throw new ErrorWatchingAd(`Advertiser not found: ${loginQueries.userName}`)
      const ads = await adFinderHandler.findAll(advertiser.id);
      console.log(ads)
      if(ads.length <= 0) throw new ErrorWatchingAd(`No ads found for the advertiser: ${loginQueries.userName}`)
      return {
        watchAds: ads,
        user: { ...session } as IUser,
      };
    } else {
      return {
        watchAds:[],
        user: { ...session } as IUser,
      };
    }
  }
}
