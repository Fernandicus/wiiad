import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSSendEvent {
  constructor(private frontWebSocket: IFrontWSS) {}

  finishedWatchingAd(userId: UniqId): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("finish-watching-ad"),
      { user_id: userId.id }
    );
  }
}
