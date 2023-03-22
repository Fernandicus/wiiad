import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWSSListenEvent {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  finishedWatchingAd(handler: (data:{message: string}) => void): void {
    this.frontWebSocket.listenEvent(
      WebSocketEventName.event("finish-watching-ad"),
      handler
    );
  }
}
