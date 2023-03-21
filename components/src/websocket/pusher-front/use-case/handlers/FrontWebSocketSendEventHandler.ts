import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { FrontWebSocketSendEvent } from "../FrontWebSocketSendEvent";

export class FrontWebSocketSendEventHandler {
  constructor(private webSocketSendEvent: FrontWebSocketSendEvent) {}

  finishedWatchingAd(userId: string): void {
    this.webSocketSendEvent.finishedWatchingAd(new UniqId(userId));
  }
}
