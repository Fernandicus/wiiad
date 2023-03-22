import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSConnectUser {
  constructor(private frontWebSocket: IFrontWSS) {}

  connect(props: {
    onSuccess: (data: unknown) => void;
    onError: (data: unknown) => void;
  }): void {
    this.frontWebSocket.connectUser(props);
  }
}
