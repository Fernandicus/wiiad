import { UniqId } from "@/src/common/domain/UniqId";
import { FrontWSSDisconnect } from "../FrontWSSDisconnect";

export class FrontWSSDisconnectHandler {
  constructor(private webSocketDisconnect: FrontWSSDisconnect) {}

  disconnect(userId: string) {
    this.webSocketDisconnect.disconnect(new UniqId(userId));
  }
}
