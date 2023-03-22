import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWSSConnectUser {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  connect(props: {
    onSuccess: (data: unknown) => void;
    onError: (data: unknown) => void;
  }): void {
    this.frontWebSocket.connectUser(props);
  }
}
