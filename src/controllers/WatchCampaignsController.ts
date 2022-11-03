import { ErrorWatchingCampaign } from "../domain/ErrorWatchingCampaign";
import { IGenericUserPrimitives, IGenericUserProps } from "../domain/IGenericUser";
import { ICampaignPrimitives } from "../modules/campaign/domain/Campaign";
import { findCampaignHandler } from "../modules/campaign/container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { adFinderHandler } from "../modules/ad/ad-container";
import { findUserHandler } from "../modules/user/container";

export interface IWatchCampaignData {
  activeCampaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referrer: IGenericUserPrimitives;
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
    return { ...campaignData, referrer: urlUserNameFound };
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
