import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { IWatchingAdApiCall } from "../domain/interface/IWatchingAdApiCall";
import { getApiResponse } from "@/src/utils/helpers";
import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { IApiReqWatchingAdAction } from "@/pages/api/v1/channel-events";

export class WatchingAdFetchApiCall implements IWatchingAdApiCall {
  async finishWatchingAd(data: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const action = WatchingAdActionName.action("finish-watching-ad");
    const body: IApiReqWatchingAdAction = {
      refereeId: data.refereeId.value(),
      referrerId: data.referrerId.value(),
    };
    const resp = await fetch(ApiRoutes.watchingAdSendAction(action.action), {
      method: "PUT",
      body: JSON.stringify(body),
    });
    console.log(resp.status);
    const json = await getApiResponse(resp);
    console.log(json.message);
  }

  async startWatchingAd(data: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    const action = WatchingAdActionName.action("start-watching-ad");
    const body: IApiReqWatchingAdAction = {
      refereeId: data.refereeId.value(),
      referrerId: data.referrerId.value(),
    };
    const resp = await fetch(ApiRoutes.watchingAdSendAction(action.action), {
      method: "PUT",
      body: JSON.stringify(body),
    });
    console.log(resp.status);
    const json = await getApiResponse(resp);
    console.log(json.message);
  }
}
