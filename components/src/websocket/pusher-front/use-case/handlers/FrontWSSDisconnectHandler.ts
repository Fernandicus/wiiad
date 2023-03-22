import { UniqId } from "@/src/utils/UniqId";
import { FrontWSSDisconnect } from "../FrontWSSDisconnect";

export class FrontWSSDisconnectHandler {
  constructor(private webSocketDisconnect: FrontWSSDisconnect) {}

  disconnect(userId: string) {
    this.webSocketDisconnect.disconnect(new UniqId(userId));
  }
}
