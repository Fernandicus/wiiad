import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";

export class FrontWebSocketDisconnect {
  constructor(private frontWebSocket: IFrontWebSocket) {}

  disconnect(): void {
    this.frontWebSocket.disconnect();
  }
}
