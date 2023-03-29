import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/common/domain/UniqId";
import { IFrontWSS } from "../domain/interface/IFrontWSS";
import { IApiReqWebSocketSendEvent } from "@/pages/api/v1/channel-events";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export class FrontWSSSendEvent {
  constructor(private frontWebSocket: IFrontWSS) {}

  startWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("start-watching-ad"),
      {
        refereeId: props.refereeId.value(),
        referrerId: props.referrerId.value(),
      } as IApiReqWebSocketSendEvent
    );
  }

  finishWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("finish-watching-ad"),
      {
        refereeId: props.refereeId.value(),
        referrerId: props.referrerId.value(),
      } as IApiReqWebSocketSendEvent
    );
  }
}
