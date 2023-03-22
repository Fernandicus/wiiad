import { TPusherSendEvent } from "../types/types";
import { WebSocketEventName } from "../WebSocketEventName";
import { PusherWSS } from "../../infrastructure/PusherWSS";
import { IWebSocketService } from "../interface/IWebSocketService";

export class SendWSEvent {
  constructor(private pusherWebSocket: IWebSocketService) {}

  async finishWatchingAd<T>(
    props: Omit<TPusherSendEvent<T>, "event">
  ): Promise<void> {
    const { data, userId } = props;
    await this.pusherWebSocket.sendEventToUser({
      event: WebSocketEventName.event("finish-watching-ad"),
      userId,
      data,
    });
  }
}
