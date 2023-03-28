import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/common/domain/UniqId";
import { FrontWSSSendEvent } from "../FrontWSSSendEvent";

export class FrontWSSSendEventHandler {
  constructor(private webSocketSendEvent: FrontWSSSendEvent) {}

  startWatchingAd(userId: string): void {
    this.webSocketSendEvent.startWatchingAd(new UniqId(userId));
  }
}
