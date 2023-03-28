import { WebSocketEventName } from "../domain/WebSocketEventName";
import { IWebSocketService } from "../domain/interface/IWebSocketService";
import { UniqId } from "@/src/common/domain/UniqId";
import { TWatchingAdEventData } from "../domain/types/types";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";


export class SendWSEvent {
  constructor(private wss: IWebSocketService) {}

  async finishWatchingAd(refereeId: RefereeId): Promise<void> {
    await this.wss.sendEventToUser<TWatchingAdEventData>({
      userId: refereeId.uniqId,
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
