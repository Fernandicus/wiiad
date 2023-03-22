import { UniqId } from "@/src/utils/UniqId";
import { PusherWSS } from "../infrastructure/PusherWSS";

export class DisconnectWSS {
  constructor(private pusherWebSocket: PusherWSS) {}

  async disconnect(userId: UniqId): Promise<void> {
    await this.pusherWebSocket.closeConnection(userId);
  }
}
