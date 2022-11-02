import { ErrorWatchingCampaign } from "../domain/ErrorWatchingCampaign";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IGenericUserPrimitives, IGenericUserProps } from "../domain/IUser";
import { RolType } from "../domain/Rol";
import { LoginQueries } from "../domain/LoginQueries";
import { findAdvertiserHandler } from "../modules/advertiser/advertiser-container";
import { userSession } from "../use-case/container";
import { ICampaignPrimitives } from "../modules/campaign/domain/Campaign";
import { findCampaignHandler } from "../modules/campaign/container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { adFinderHandler } from "../modules/ad/ad-container";
import { ErrorFindingAd } from "../modules/ad/domain/ErrorFindingAd";
import { ErrorFindingCampaign } from "../modules/campaign/domain/ErrorFindingCampaign";
import { findUserHandler } from "../modules/user/container";
import { IUserPrimitives } from "../modules/user/domain/User";

export interface IWatchCampaignData {
  activeCampaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referral: IGenericUserPrimitives;
}

export class WatchCampaignsController {
  static async forInfluencer(
    influencerName: string
  ): Promise<IWatchCampaignData> {
    const urlUserNameFound = await findUserHandler.findByUserName(
      influencerName
    );

    if (!urlUserNameFound)
      throw new ErrorWatchingCampaign(
        `User profile ${influencerName} do not exist`
      );
    const campaignData = await this.randomActiveCampaign();
    return { ...campaignData, referral: urlUserNameFound };
  }

  static async randomActiveCampaign(): Promise<{
    activeCampaign: ICampaignPrimitives;
    ad: AdPropsPrimitives;
  }> {
    const activeCampaigns = await findCampaignHandler.allActives();
    const randomCampaign = this.randomCampaign(activeCampaigns);
    const ad = await adFinderHandler.findByAdId(randomCampaign.adId);
    return {
      activeCampaign: randomCampaign,
      ad,
    };
  }

  private static randomCampaign(
    activeCampaigns: ICampaignPrimitives[]
  ): ICampaignPrimitives {
    const random = Math.round(Math.random() * (activeCampaigns.length - 1));
    console.log(" WATCH CAMPAIGN CONTROLLER ", activeCampaigns.length);
    console.log(" WATCH CAMPAIGN CONTROLLER ", random);
    return activeCampaigns[random];
  }
}
