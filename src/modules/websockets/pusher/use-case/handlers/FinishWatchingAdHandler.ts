import { UniqId } from "@/src/utils/UniqId";
import { FinishWatchingAd } from "../FinishWatchingAd";

export class FinishWatchingAdHandler {
  constructor(private finishWatchingAd: FinishWatchingAd) {}


  /**
   * The referral saved is the Referee User
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
