import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSListenEvent {
  constructor(private frontWebSocket: IFrontWSS) {}

  finishedWatchingAd(handler: (data:unknown) => void): void {
    this.frontWebSocket.listenEvent(
      WebSocketEventName.event("finish-watching-ad"),
      handler
    );
  }
}
