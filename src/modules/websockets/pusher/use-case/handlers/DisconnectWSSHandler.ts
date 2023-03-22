import { UniqId } from "@/src/utils/UniqId";
import { DisconnectWSS } from "../DisconnectWSS";

export class DisconnectWSSHandler {
  constructor(private disconnectWebSocket: DisconnectWSS) {}

  async disconnect(userId: string): Promise<void> {
    await this.disconnectWebSocket.disconnect(new UniqId(userId));
  }
}
