import { IReqAndRes } from "../domain/IAuthCookies";
import { IUser } from "../domain/IUser";
import { ValidateLoginQueries } from "../domain/ValidateLoginQueries";
import { adFinderHandler } from "../modules/ad/ad-container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { findAdvertiserHandler } from "../modules/advertiser/advertiser-container";
import { userSession } from "../use-case/container";

export interface IVisitProfile {
  isViewingAd: boolean;
  user: IUser;
  ads: AdPropsPrimitives[];
}

export class VisitProfileController {
  static async watchAdOrVisitProfile(
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
        isViewingAd: true,
        user: { ...session } as IUser,
      };
    } else {
      return {
        ads: [],
        isViewingAd: false,
        user: { ...session } as IUser,
      };
    }
  }
}
