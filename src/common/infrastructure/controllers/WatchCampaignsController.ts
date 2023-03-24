import { ICampaignPrimitives } from "../../../modules/campaign/domain/Campaign";
import {
  campaignMetricsHandler,
  findCampaignHandler,
} from "../../../modules/campaign/infrastructure/campaign-container";
import { AdPropsPrimitives } from "../../../modules/ad/domain/Ad";
import { adFinderHandler } from "../../../modules/ad/infraestructure/ad-container";
import { findUserHandler } from "../../../modules/users/user/container";
import { updateReferralHandler } from "../../../modules/referrals/infrastructure/referral-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ErrorWatchingCampaign } from "../../domain/ErrorWatchingCampaign";

export interface IWatchCampaignData {
  activeCampaign: ICampaignPrimitives;
  ad: AdPropsPrimitives;
  referrer: IUserPrimitives;
}

export class WatchCampaignsController {
  static async forInfluencer(params: {
    influencerName: string;
    session: IUserPrimitives | null;
  }): Promise<IWatchCampaignData> {
    const { influencerName, session } = params;
    const referrer = await findUserHandler.byName(influencerName);
    const data = await referrer.match({
      nothing() {
        throw ErrorWatchingCampaign.referrerDoesNotExist(influencerName);
      },
      some: async (referrer) => {
        const campaignData = await this.randomActiveCampaign();

        updateReferralHandler.increaseReferredUsers(referrer.id);
        if (session) updateReferralHandler.increaseWatchedAds(session.id);

        return { ...campaignData, referrer };
      },
    });

    return data;
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
