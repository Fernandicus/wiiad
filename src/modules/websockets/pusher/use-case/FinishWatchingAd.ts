import { AddReferralToCampaign } from "@/src/common/use-case/AddReferralToCampaign";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";
import { ErrorFindingReferral } from "@/src/modules/referrals/domain/errors/ErrorFindingReferral";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { IncreaseReferralBalance } from "@/src/modules/referrals/use-case/IncreaseReferralBalance";
import { UniqId } from "@/src/utils/UniqId";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

export type TFinishWatchingAdProps = {
  increaseBalance: IncreaseReferralBalance;
  addReferralToCampaign: AddReferralToCampaign;
  watchingAdList: WatchAdTimerList;
  findCampaign: FindCampaign;
};

export class FinishWatchingAd {
  private watchingAdList;
  private increaseBalance;
  private findCampaign;
  private addReferralToCampaign;

  constructor(props: TFinishWatchingAdProps) {
    this.watchingAdList = props.watchingAdList;
    this.increaseBalance = props.increaseBalance;
    this.findCampaign = props.findCampaign;
    this.addReferralToCampaign = props.addReferralToCampaign;
  }

  /**
   * The referral saved is the Referrer User.
   * This is because the Referee maybe is not logged and the referee id is not available.
   * that's not the case for the Referrer id
   */
  async validateAndAirdrop(props: {
    refereeId: UniqId;
    referrerId: UniqId;
  }): Promise<void> {
    const { refereeId, referrerId } = props;

    const update = async (campaignId: UniqId) => {
      await this.updateData({
        campaignId,
        refereeId,
        referrerId,
      });
    };

    await this.watchingAdList.findAdByUserId(refereeId).match({
      some: async (adTimeout) => {
        if (adTimeout.isEnded()) {
          await update(adTimeout.campaignId);
        } else {
          throw new Error("Ad has not finished");
        }
      },
      nothing() {
        throw new Error("User id is not in the list");
      },
    });
  }

  private async updateData(props: {
    campaignId: UniqId;
    refereeId: UniqId;
    referrerId: UniqId;
  }) {
    const campaignData = await this.findCampaign.byId(props.campaignId);

    const [increaseBalanceResp, addReferralResp] = await Promise.allSettled([
      this.increaseBalance.increase({
        balance: campaignData.budget.balance,
        refereeId: props.refereeId,
        referrerId: props.referrerId,
      }),
      this.addReferralToCampaign.givenRefereeId({
        referrerId: props.referrerId,
        campaignId: props.campaignId,
      }),
    ]);

    if (increaseBalanceResp.status === "rejected")
      throw new Error("Error increasing balances");
    if (addReferralResp.status === "rejected")
      throw new Error("Error adding referral");
  }
}
