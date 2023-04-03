import { UniqId } from "@/src/common/domain/UniqId";
import { AddReferralToCampaign } from "@/src/common/use-case/AddReferralToCampaign";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { IncreaseReferralBalance } from "@/src/modules/referrals/use-case/IncreaseReferralBalance";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { FindWatchingAd } from "./FindWatchingAd";

type TUpdateWatchingAdStakeHoldersDataProps = {
  increaseBalance: IncreaseReferralBalance;
  findCampaign: FindCampaign;
  updateReferral: UpdateReferral;
  addReferralToCampaign: AddReferralToCampaign;
};

type TUpdateData = {
  campaignId: UniqId;
  refereeId: RefereeId;
  referrerId: ReferrerId;
};

export class UpdateWatchingAdStakeHoldersData {
  private increaseBalance;
  private findCampaign;
  private addReferralToCampaign;
  private updateReferral;

  constructor(props: TUpdateWatchingAdStakeHoldersDataProps) {
    this.increaseBalance = props.increaseBalance;
    this.findCampaign = props.findCampaign;
    this.addReferralToCampaign = props.addReferralToCampaign;
    this.updateReferral = props.updateReferral;
  }

  async updateData({ campaignId, refereeId, referrerId }: TUpdateData):Promise<void> {
    const campaignData = await this.findCampaign.byId(campaignId);

    const [increaseBalanceResp, addReferralResp, increaseWatchedAdsResp] =
      await Promise.allSettled([
        this.increaseBalance.increase({
          balance: campaignData.budget.balance,
          refereeId: refereeId,
          referrerId: referrerId,
        }),
        this.addReferralToCampaign.givenReferrerId({
          referrerId: referrerId,
          campaignId: campaignId,
        }),
        this.updateReferral.increaseWatchedAds(refereeId),
      ]);

    if (increaseBalanceResp.status === "rejected")
      throw new Error(increaseBalanceResp.reason);
    if (addReferralResp.status === "rejected")
      throw new Error(addReferralResp.reason);
    if (increaseWatchedAdsResp.status === "rejected")
      throw new Error(increaseWatchedAdsResp.reason);
  }
}
