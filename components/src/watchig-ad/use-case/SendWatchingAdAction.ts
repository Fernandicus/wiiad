import { IApiReqWebSocketSendEvent } from "@/pages/api/v1/channel-events";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";
import { IWatchingAdApiCall } from "../domain/interface/IWatchingAdApiCall";

export class SendWatchingAdAction {
  constructor(private watchingAdApiCall: IWatchingAdApiCall) {}

  async startWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const data: IApiReqWebSocketSendEvent = {
      refereeId: props.refereeId.value(),
      referrerId: props.referrerId.value(),
    };
    await this.watchingAdApiCall.sendEvent({
      event: WatchingAdActionName.action("start-watching-ad"),
      data,
    });
  }

  async finishWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const data: IApiReqWebSocketSendEvent = {
      refereeId: props.refereeId.value(),
      referrerId: props.referrerId.value(),
    };
    await this.watchingAdApiCall.sendEvent({
      event: WatchingAdActionName.action("finish-watching-ad"),
      data,
    });
  }
}
