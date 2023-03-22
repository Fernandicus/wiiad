import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWSSSendEvent {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  finishedWatchingAd(userId: UniqId): void {
    this.frontWebSocket.sendEvent(
      WebSocketEventName.event("finish-watching-ad"),
      { user_id: userId.id }
    );
  }
}
