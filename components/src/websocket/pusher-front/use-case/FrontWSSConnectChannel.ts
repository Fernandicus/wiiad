import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSConnectChannel {
  constructor(private frontWebSocket: IFrontWSS) {}

  watchAd(props: {
    onError: (data: unknown) => void;
    onSuccess: (data: unknown) => void;
  }): void {
    this.frontWebSocket.connectChannel(WebSocketChannel.watchAd(), props);
  }
}
