import { Campaign } from "../domain/Campaign";
import { Ad } from "../../ad/domain/Ad";
import { User } from "@/src/modules/users/user/domain/User";
import { ErrorWatchingCampaign } from "../../../common/domain/ErrorWatchingCampaign";
import { FindUser } from "@/src/modules/users/user/use-case/FindUser";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { Name } from "../../../common/domain/Name";
import { UniqId } from "@/src/common/domain/UniqId";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";
import { FindAds } from "@/src/modules/ad/use-case/FindAds";

export type TGetSelectedWatchAdData = {
  campaignId: UniqId;
  ad: Ad;
  referrerProfile: User;
};

type TSelectCampaignToWatchProps = {
  findUser: FindUser;
  findCampaign: FindCampaign;
  updateReferral: UpdateReferral;
  findAd: FindAds;
};

export class SelectCampaignToWatch {
  private findUser;
  private findCampaign;
  private findAd;

  constructor({ findCampaign, findUser, findAd }: TSelectCampaignToWatchProps) {
    this.findCampaign = findCampaign;
    this.findUser = findUser;
    this.findAd = findAd;
  }

  //Todo: implement a better algorithm to select the correct ad according to the user/referrer interests
  async get(params: {
    referrerName: Name;
    sessionId?: UniqId;
  }): Promise<TGetSelectedWatchAdData> {
    const { referrerName, sessionId } = params;
    const referrer = await this.findUser.byName(referrerName);

    const data = await referrer.match({
      nothing() {
        throw ErrorWatchingCampaign.referrerDoesNotExist(referrerName.name);
      },
      some: async (referrer) => {
        const campaignData = await this.randomActiveCampaign();
        return {
          campaignId: campaignData.campaign.id,
          referrerProfile: referrer,
          ad: campaignData.ad,
        };
      },
    });

    return data;
  }

  async randomActiveCampaign(): Promise<{
    campaign: Campaign;
    ad: Ad;
  }> {
    const activeCampaigns = await this.findCampaign.allActives();
    const randomCampaign = this.randomCampaign(activeCampaigns);
    const ad = await this.findAd.findByAdId(randomCampaign.adId);
    return {
      campaign: randomCampaign,
      ad,
    };
  }

  private randomCampaign(activeCampaigns: Campaign[]): Campaign {
    const random = Math.round(Math.random() * (activeCampaigns.length - 1));
    return activeCampaigns[random];
  }
}
