import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWSS } from "../domain/interface/IFrontWSS";

export class FrontWSSDisconnect {
  constructor(private frontWebSocket: IFrontWSS) {}

  disconnect(userId: UniqId): void {
    this.frontWebSocket.disconnect(userId);
  }
}
