import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UniqId } from "@/src/common/domain/UniqId";
import { FinishWatchingAd } from "../FinishWatchingAd";

export class FinishWatchingAdHandler {
  constructor(private finishWatchingAd: FinishWatchingAd) {}

  /**
   * The referral saved in the referral campaign is the Referrer User.
   * This is because the Referee maybe is not logged and the referee id is not available.
   * that's not the case for the Referrer id
   */
  async validateAndAirdrop(props: {
    refereeValue: string;
    referrerValue: string;
  }): Promise<void> {
    const { refereeValue, referrerValue } = props;
    await this.finishWatchingAd.validateAndAirdrop({
      refereeId: RefereeId.fromString(refereeValue),
      referrerId: ReferrerId.fromString(referrerValue),
    });
  }
}
