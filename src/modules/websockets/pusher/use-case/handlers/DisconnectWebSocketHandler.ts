import { UniqId } from "@/src/utils/UniqId";
import { DisconnectWebSocket } from "../DisconnectWebSocket";

export class DisconnectWebSocketHandler {
  constructor(private disconnectWebSocket: DisconnectWebSocket) {}

  async disconnect(userId: string): Promise<void> {
    await this.disconnectWebSocket.disconnect(new UniqId(userId));
  }
}
