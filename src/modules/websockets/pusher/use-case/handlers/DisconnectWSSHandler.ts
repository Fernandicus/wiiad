import { UniqId } from "@/src/common/domain/UniqId";
import { DisconnectWSS } from "../DisconnectWSS";

export class DisconnectWSSHandler {
  constructor(private disconnectWebSocket: DisconnectWSS) {}

  async disconnect(userId: string): Promise<void> {
    await this.disconnectWebSocket.disconnect(new UniqId(userId));
  }
}
