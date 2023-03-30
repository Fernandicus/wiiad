import { UniqId } from "@/src/common/domain/UniqId";
import { SendWatchingAdAction } from "../SendWatchingAdAction";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export class SendWatchingAdActionHandler {
  constructor(private sendWatchingAdAction: SendWatchingAdAction) {}

  async startWatchingAd(props: {
    refereeValue: string;
    referrerValue: string;
  }): Promise<void> {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({
      uniqId: new UniqId(props.referrerValue),
    });
    await this.sendWatchingAdAction.startWatchingAd({
      refereeId,
      referrerId,
    });
  }

  async finishWatchingAd(props: {
    refereeValue: string;
    referrerValue: string;
  }): Promise<void> {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({
      uniqId: new UniqId(props.referrerValue),
    });
    await this.sendWatchingAdAction.finishWatchingAd({
      refereeId,
      referrerId,
    });
  }
}
