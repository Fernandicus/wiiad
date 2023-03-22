import { TPusherSendEvent } from "../domain/types/types";
import { WebSocketEventName } from "../domain/WebSocketEventName";
import { PusherWSS } from "../infrastructure/PusherWSS";

export class SendWSEvent {
  constructor(private pusherWebSocket: PusherWSS) {}

  async finishWatchingAd(
    props: Omit<TPusherSendEvent, "event">
  ): Promise<void> {
    const { data, userId } = props;
    await this.pusherWebSocket.sendEventToUser({
      event: WebSocketEventName.event("finish-watching-ad"),
      userId,
      data,
    });
  }
}
