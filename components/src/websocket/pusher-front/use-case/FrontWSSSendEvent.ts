import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/common/domain/UniqId";
import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSSendEvent {
  constructor(private frontWebSocket: IFrontWSS) {}

  startWatchingAd(userId: UniqId): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("start-watching-ad"),
      { user_id: userId.id }
    );
  }
}
