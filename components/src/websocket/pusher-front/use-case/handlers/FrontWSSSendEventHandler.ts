import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/common/domain/UniqId";
import { FrontWSSSendEvent } from "../FrontWSSSendEvent";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export class FrontWSSSendEventHandler {
  constructor(private webSocketSendEvent: FrontWSSSendEvent) {}

  startWatchingAd(props: { refereeValue: string; referrerId: string }): void {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({ uniqId: new UniqId(props.referrerId) });
    this.webSocketSendEvent.startWatchingAd({
      refereeId,
      referrerId,
    });
  }
  
  finishWatchingAd(props: { refereeValue: string; referrerId: string }): void {
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = new ReferrerId({ uniqId: new UniqId(props.referrerId) });
    this.webSocketSendEvent.finishWatchingAd({
      refereeId,
      referrerId,
    });
  }
}
