import { AddReferralToCampaign } from "@/src/common/use-case/AddReferralToCampaign";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";
import { ErrorFindingReferral } from "@/src/modules/referrals/domain/errors/ErrorFindingReferral";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { IncreaseReferralBalance } from "@/src/modules/referrals/use-case/IncreaseReferralBalance";
import { UniqId } from "@/src/common/domain/UniqId";
import { IWatchingAdRepo } from "../domain/interface/IWatchingAdRepo";

export type TFinishWatchingAdProps = {
  increaseBalance: IncreaseReferralBalance;
  addReferralToCampaign: AddReferralToCampaign;
  watchAdRepo: IWatchingAdRepo;
  findCampaign: FindCampaign;
};

export class FinishWatchingAd {
  private watchAdRepo;
  private increaseBalance;
  private findCampaign;
  private addReferralToCampaign;

  constructor(props: TFinishWatchingAdProps) {
    this.watchAdRepo = props.watchAdRepo;
    this.increaseBalance = props.increaseBalance;
    this.findCampaign = props.findCampaign;
    this.addReferralToCampaign = props.addReferralToCampaign;
  }

  /**
   * The referral saved in the Campaign referrals is the Referrer User.
   * This is because the Referee maybe is not logged and the referee id is not available.
   * that's not the case for the Referrer id
   */
  async validateAndAirdrop(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const { refereeId, referrerId } = props;

    const update = async (campaignId: UniqId) => {
      await this.updateData({
        campaignId,
        refereeId,
        referrerId,
      });
    };

    //todo: Pass by parameter the: refereeId,  onFinished(), onNotFinished(), so I can pass the update function from the outside
    //! Think about passing a Maybe or Either and update the campaign referral data in another Use Case
    const maybe = await this.watchAdRepo.findAdByRefereeId(refereeId);
    await maybe.match({
      some: async (adTimeout) => {
        if (adTimeout.hasEnded()) {
          await this.watchAdRepo.removeTimer(refereeId);
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
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }) {
    const campaignData = await this.findCampaign.byId(props.campaignId);

    const [increaseBalanceResp, addReferralResp] = await Promise.allSettled([
      this.increaseBalance.increase({
        balance: campaignData.budget.balance,
        refereeId: props.refereeId,
        referrerId: props.referrerId,
      }),
      this.addReferralToCampaign.givenReferrerId({
        referrerId: props.referrerId,
        campaignId: props.campaignId,
      }),
    ]);

    if (increaseBalanceResp.status === "rejected")
      throw new Error(increaseBalanceResp.reason);
    if (addReferralResp.status === "rejected")
      throw new Error(addReferralResp.reason);

    console.log(campaignData.id);
  }
}
