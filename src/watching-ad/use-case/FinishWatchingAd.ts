import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { FindWatchingAd } from "./FindWatchingAd";
import { RemoveWatchingAd } from "./RemoveWatchingAd";
import { UpdateWatchingAdStakeHoldersData } from "./UpdateWatchingAdStakeHoldersData";

export type TFinishWatchingAdProps = {
  findWatchingAd: FindWatchingAd;
  removeWatchingAd: RemoveWatchingAd;
  updateWatchingAdStakeHolders: UpdateWatchingAdStakeHoldersData;
};

export class FinishWatchingAd {
  private findWatchingAd;
  private removeWatchingAd;
  private updateWatchingAdStakeHolders;

  constructor(props: TFinishWatchingAdProps) {
    this.findWatchingAd = props.findWatchingAd;
    this.removeWatchingAd = props.removeWatchingAd;
    this.updateWatchingAdStakeHolders = props.updateWatchingAdStakeHolders;
  }

  /**
   * The referral saved in the Campaign referrals is the Referrer User.
   * This is because the Referee maybe is not logged and the referee id is not available.
   * that's not the case for the Referrer id
   */
  async finish(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const { refereeId, referrerId } = props;
    const watchingAdFound = await this.findWatchingAd.byRefereeId(refereeId);

    await watchingAdFound.match({
      some: async (adTimeout) => {
        if (!adTimeout.hasEnded()) throw new Error("Ad has not finished");

        await Promise.allSettled([
          this.removeWatchingAd.byRefereeId(refereeId),
          this.updateWatchingAdStakeHolders.updateData({
            campaignId: adTimeout.campaignId,
            refereeId,
            referrerId,
          }),
        ]);
      },
      nothing() {
        throw new Error("User id is not in the list");
      },
    });
  }
}
