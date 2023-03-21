import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWebSocketSendEvent {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  finishedWatchingAd(userId: UniqId): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("finish-watching-ad"),
      { user_id: userId.id }
    );
  }
}
