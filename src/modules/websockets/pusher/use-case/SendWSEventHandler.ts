import { TPusherSendEvent } from "../domain/types/types";
import { WebSocketEventName } from "../domain/WebSocketEventName";
import { PusherWSS } from "../infrastructure/PusherWSS";
import { IWebSocketService } from "../domain/interface/IWebSocketService";
import { UniqId } from "@/src/utils/UniqId";
import { SendWSEvent } from "./SendWSEvent";

export type TWatchingAdEventData = { status: number };

export class SendWSEventHandler {
  constructor(private sendEvent: SendWSEvent) {}

  async finishWatchingAd(userId: string): Promise<void> {
    await this.sendEvent.finishWatchingAd(new UniqId(userId));
  }
}
