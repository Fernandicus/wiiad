import { ErrorWatchingCampaign } from "../domain/ErrorWatchingCampaign";
import { IReqAndRes } from "../domain/IAuthCookies";
import { IGenericUserPrimitives } from "../domain/IUser";
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

export interface IWatchCampaignData {
  activeCampaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
}

export class WatchCampaignsController {
  static async randomActiveCampaign(): Promise<IWatchCampaignData> {
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
    const random = Math.round(Math.random() * activeCampaigns.length);
    return activeCampaigns[random];
  }
}
