import { ErrorWatchingCampaign } from "../domain/ErrorWatchingCampaign";
import {
  IGenericUserPrimitives,
  IGenericUserProps,
} from "../domain/IGenericUser";
import { ICampaignPrimitives } from "../modules/campaign/domain/Campaign";
import {
  campaignMetricsHandler,
  findCampaignHandler,
} from "../modules/campaign/container";
import { AdPropsPrimitives } from "../modules/ad/domain/Ad";
import { adFinderHandler } from "../modules/ad/ad-container";
import { findUserHandler } from "../modules/user/container";
import { updateReferralHandler } from "../modules/referrals/referral-container";

export interface IWatchCampaignData {
  activeCampaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referrer: IGenericUserPrimitives;
}

export class WatchCampaignsController {
  static async forInfluencer(params: {
    influencerName: string;
    session: IGenericUserPrimitives | null;
  }): Promise<IWatchCampaignData> {
    const { influencerName, session } = params;

    const referrer = await findUserHandler.findByUserName(influencerName);
    const campaignData = await this.randomActiveCampaign();
    
    updateReferralHandler.increaseReferredUsers(referrer.id)
    if (session) updateReferralHandler.increaseWatchedAds(session.id);

    return { ...campaignData, referrer };
  }

  static async randomActiveCampaign(): Promise<{
    activeCampaign: ICampaignPrimitives;
    ad: AdPropsPrimitives;
  }> {
    const activeCampaigns = await findCampaignHandler.allActives();
    const randomCampaign = this.randomCampaign(activeCampaigns);
    campaignMetricsHandler.increaseViews(randomCampaign.id);
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
    return activeCampaigns[random];
  }
}
