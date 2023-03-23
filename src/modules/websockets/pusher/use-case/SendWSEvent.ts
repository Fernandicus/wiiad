import { WebSocketEventName } from "../domain/WebSocketEventName";
import { IWebSocketService } from "../domain/interface/IWebSocketService";
import { UniqId } from "@/src/utils/UniqId";
import { TWatchingAdEventData } from "../domain/types/types";


export class SendWSEvent {
  constructor(private wss: IWebSocketService) {}

  async finishWatchingAd(userId: UniqId): Promise<void> {
    await this.wss.sendEventToUser<TWatchingAdEventData>({
      userId,
      event: WebSocketEventName.event("finish-watching-ad"),
      data: {
        message: "Ad watched",
        data: {
          status: 200,
        },
      },
    });
  }
}
