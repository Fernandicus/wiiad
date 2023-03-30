import { AnonymReferenceId } from "@/src/common/domain/AnonymReferenceId";
import { Name } from "@/src/common/domain/Name";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { IGetAdDuration } from "@/src/modules/ad/domain/interfaces/IGetAdDuration";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { User } from "@/src/modules/users/user/domain/User";
import { FindUser } from "@/src/modules/users/user/use-case/FindUser";
import { InsertUserWatchingAd } from "./InsertUserWatchingAd";
import { SelectCampaignToWatch } from "./SelectCampaignToWatch";

type TInitializeWatchingAd = {
  referee?: User;
  referrerName: Name;
};

type TInitializeWatchingAdResponse = {
  refereeId: RefereeId;
  ad: Ad;
  referrerProfile: User;
};

export class InitWatchingAd {
  private selectCampaign;
  private findUser;
  private getAdDuration;
  private insertUserWatchingAd;

  constructor(props: {
    selectCampaign: SelectCampaignToWatch;
    findUser: FindUser;
    getAdDuration: IGetAdDuration;
    insertUserWatchingAd: InsertUserWatchingAd;
  }) {
    this.selectCampaign = props.selectCampaign;
    this.findUser = props.findUser;
    this.getAdDuration = props.getAdDuration;
    this.insertUserWatchingAd = props.insertUserWatchingAd;
  }

  async initialize({
    referrerName,
    referee,
  }: TInitializeWatchingAd): Promise<TInitializeWatchingAdResponse> {
    const selectedCampaign = await this.selectCampaign.randomActiveCampaign();
    const { ad, campaign } = selectedCampaign;
    const refereeId = getRefereeId(referee);

    const referrerFound = await this.findUser.byName(referrerName);

    const data = await referrerFound.match({
      some: async (referrerProfile) => {
        const referrerId = new ReferrerId({ uniqId: referrerProfile.id });
        const adDuration = await this.getAdDuration.get(ad.file);
        return { adDuration, referrerId, referrerProfile };
      },
      nothing() {
        throw new Error(`Referrer '${referrerName}' not found`);
      },
    });

    await this.insertUserWatchingAd.insert({
      adDuration: data.adDuration,
      referrerId: data.referrerId,
      campaignId: campaign.id,
      refereeId,
    });

    return {
      ad,
      refereeId,
      referrerProfile: data.referrerProfile,
    };
  }
}

function getRefereeId(referee?: User): RefereeId {
  return referee
    ? new RefereeId({ uniqId: referee.id })
    : new AnonymReferenceId(RefereeId.new());
}
