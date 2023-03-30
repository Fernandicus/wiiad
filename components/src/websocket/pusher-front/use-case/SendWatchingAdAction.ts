import { IApiReqWebSocketSendEvent } from "@/pages/api/v1/channel-events";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { WatchingAdActionName } from "@/src/watching-ad/pusher/domain/WebSocketEventName";
import { IWatchingAdApiCall } from "../domain/interface/IWatchingAdApiCall";

export class SendWatchingAdAction {
  constructor(private frontWebSocket: IWatchingAdApiCall) {}

  startWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): void {
    this.frontWebSocket.sendEvent(
      WatchingAdActionName.event("start-watching-ad"),
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
      WatchingAdActionName.event("finish-watching-ad"),
      {
        refereeId: props.refereeId.value(),
        referrerId: props.referrerId.value(),
      } as IApiReqWebSocketSendEvent
    );
  }
}
