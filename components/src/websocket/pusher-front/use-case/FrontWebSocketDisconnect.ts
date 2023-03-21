import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWebSocketDisconnect {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  disconnect(userId: UniqId): void {
    this.frontWebSocket.disconnect(userId);
  }
}
