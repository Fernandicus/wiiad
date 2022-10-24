import { ErrorWatchingCampaign } from "../domain/ErrorWatchingCampaign";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IGenericUserPrimitives } from "../domain/IUser";
import { RolType } from "../domain/Rol";
import { LoginQueries } from "../domain/LoginQueries";
import { findAdvertiserHandler } from "../modules/advertiser/advertiser-container";
import { userSession } from "../use-case/container";
import { ICampaignPrimitives } from "../modules/campaign/domain/Campaign";
import { findCampaignHandler } from "../modules/campaign/container";

export interface IWatchAdData {
  user: IGenericUserPrimitives | null;
  activeCampaigns: ICampaignPrimitives[];
}

export class WatchCampaignsController {
  static async verify(
    context: IReqAndRes,
    loginQueries: LoginQueries
  ): Promise<IWatchAdData> {
    const session = userSession.getFromServer(context);

    if (this.canWatchAd(session, loginQueries)) {
      /* const advertiser = await findAdvertiserHandler.findByUserName(
        loginQueries.userName
      );

      if (!advertiser)
        throw new ErrorWatchingCampaign(
          `Advertiser not found: ${loginQueries.userName}`
        ); */

      const activeCampaigns = await findCampaignHandler.allActives();

      /* if (!activeCampaigns || activeCampaigns.length <= 0)
        throw new ErrorWatchingCampaign(
          `No ads found for the advertiser: ${loginQueries.userName}`
        ); */

      return {
        activeCampaigns: activeCampaigns,
        user: session,
      };
    } else {
      return {
        activeCampaigns: [],
        user: session,
      };
    }
  }

  /**
   * Only no logged users or users with Rol Type User
   * can watch an ad
   */
  private static canWatchAd(
    session: IGenericUserPrimitives | null,
    loginQueries: LoginQueries
  ): boolean {
    if (!session) {
      return true;
    } else if (
      session.name !== loginQueries.userName &&
      session.rol === RolType.USER
    ) {
      return true;
    } else {
      return false;
    }
  }
}
