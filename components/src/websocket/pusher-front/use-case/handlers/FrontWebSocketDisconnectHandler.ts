import { UniqId } from "@/src/utils/UniqId";
import { FrontWebSocketDisconnect } from "../FrontWebSocketDisconnect";

export class FrontWebSocketDisconnectHandler {
  constructor(private webSocketDisconnect: FrontWebSocketDisconnect) {}

  disconnect(userId: string) {
    this.webSocketDisconnect.disconnect(new UniqId(userId));
  }
}
