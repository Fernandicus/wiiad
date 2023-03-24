import { UniqId } from "@/src/utils/UniqId";
import { IWebSocketService } from "../domain/interface/IWebSocketService";

export class DisconnectWSS {
  constructor(private pusherWebSocket: IWebSocketService) {}

  async disconnect(userId: UniqId): Promise<void> {
    await this.pusherWebSocket.closeConnection(userId);
  }
}
