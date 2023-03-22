import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import { FrontWSSSendEvent } from "../FrontWSSSendEvent";

export class FrontWSSSendEventHandler {
  constructor(private webSocketSendEvent: FrontWSSSendEvent) {}

  finishedWatchingAd(userId: string): void {
    this.webSocketSendEvent.finishedWatchingAd(new UniqId(userId));
  }
}
