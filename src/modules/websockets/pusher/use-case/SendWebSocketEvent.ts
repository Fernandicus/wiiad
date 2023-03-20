import { TPusherSendEvent } from "../domain/types/types";
import { WebSocketEventName } from "../domain/WebSocketEventName";
import { PusherWebSocket } from "../infrastructure/PusherWebSocket";

export class SendWebSocketEvent {
  constructor(private pusherWebSocket: PusherWebSocket) {}

  async finishWatchingAd(
    props: Omit<TPusherSendEvent, "event">
  ): Promise<void> {
    const { data, userId } = props;
    await this.pusherWebSocket.sendEventToUser({
      event: WebSocketEventName.finishWatchingAd(),
      userId,
      data,
    });
  }
}
