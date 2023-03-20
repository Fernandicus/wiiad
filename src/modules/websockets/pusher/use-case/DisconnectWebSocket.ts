import { UniqId } from "@/src/utils/UniqId";
import { PusherWebSocket } from "../infrastructure/PusherWebSocket";

export class DisconnectWebSocket {
  constructor(private pusherWebSocket: PusherWebSocket) {}

  async disconnect(userId: UniqId): Promise<void> {
    await this.pusherWebSocket.closeConnection(userId);
  }
}
