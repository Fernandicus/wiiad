import { UniqId } from "@/src/utils/UniqId";
import { FinishWatchingAd } from "../FinishWatchingAd";

export class FinishWatchingAdHandler {
  constructor(private finishWatchingAd: FinishWatchingAd) {}

  /**
   * The referral saved is the Referrer User.
   * This is because the Referee maybe is not logged and the referee id is not available.
   * that's not the case for the Referrer id
   */
  async validateAndAirdrop(props: {
    refereeId: string;
    referrerId: string;
  }): Promise<void> {
    await this.finishWatchingAd.validateAndAirdrop({
      refereeId: new UniqId(props.refereeId),
      referrerId: new UniqId(props.referrerId),
    });
  }
}
