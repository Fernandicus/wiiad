import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWebSocketConnectChannel {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  watchAd(props: {
    onError: (data: unknown) => void;
    onSuccess: (data: unknown) => void;
  }): void {
    this.frontWebSocket.connectChannel(WebSocketChannel.watchAd(), props);
  }
}
