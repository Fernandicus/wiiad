import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";
import { PusherWebSocketJS } from "../infrastructure/FrontPusherWebSocket";

export class FrontWebSocketConnectUser {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  connect(props: {
    onSuccess: (data: unknown) => void;
    onError: (data: unknown) => void;
  }): void {
    this.frontWebSocket.connectUser(props);
  }
}
