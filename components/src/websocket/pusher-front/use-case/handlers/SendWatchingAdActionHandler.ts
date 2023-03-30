import { UniqId } from "@/src/common/domain/UniqId";
import { SendWatchingAdAction } from "../SendWatchingAdAction";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export class SendWatchingAdActionHandler {
  constructor(private webSocketSendEvent: SendWatchingAdAction) {}

  startWatchingAd(props: {
    refereeValue: string;
    referrerValue: string;
  }): void {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({
      uniqId: new UniqId(props.referrerValue),
    });
    this.webSocketSendEvent.startWatchingAd({
      refereeId,
      referrerId,
    });
  }

  finishWatchingAd(props: {
    refereeValue: string;
    referrerValue: string;
  }): void {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({
      uniqId: new UniqId(props.referrerValue),
    });
    this.webSocketSendEvent.finishWatchingAd({
      refereeId,
      referrerId,
    });
  }
}
