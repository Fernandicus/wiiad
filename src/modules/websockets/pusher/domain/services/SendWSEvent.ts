import { TPusherSendEvent } from "../types/types";
import { WebSocketEventName } from "../WebSocketEventName";
import { PusherWSS } from "../../infrastructure/PusherWSS";
import { IWebSocketService } from "../interface/IWebSocketService";
import { UniqId } from "@/src/utils/UniqId";

export class SendWSEvent {
  constructor(private wss: IWebSocketService) {}

  async finishWatchingAd<T>(
    props: Omit<TPusherSendEvent<T>, "event">
  ): Promise<void> {
    const { data, userId } = props;
    await this.wss.sendEventToUser({
      event: WebSocketEventName.event("finish-watching-ad"),
      userId,
      data,
    });
  }

  //todo: Send event to user to get th video/banner data
  async selectedAdInfo() {
    this.wss.sendEventToUser<{ id: string; file: string }>({
      userId: UniqId.new(),
      event: WebSocketEventName.event("ad-info"),
      data: {
        message: "Ad to watch",
        data: {
          id: UniqId.generate(),
          file: "videoname.com/file.mp4",
        },
      },
    });
  }
}
