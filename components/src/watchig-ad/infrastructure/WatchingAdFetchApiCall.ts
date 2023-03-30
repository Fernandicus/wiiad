import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { IWatchingAdApiCall, TWatchingAdApiCallAction } from "../domain/interface/IWatchingAdApiCall";
import { getApiResponse } from "@/src/utils/helpers";
import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";
import { IApiReqWatchingAdAction } from "@/pages/api/v1/channel-events";

export class WatchingAdFetchApiCall implements IWatchingAdApiCall {
  async finishWatchingAd(data: TWatchingAdApiCallAction): Promise<void> {
    await this.fetchAction({
      actionName: WatchingAdActionName.action("finish-watching-ad"),
      body: {
        refereeId: data.refereeId.value(),
        referrerId: data.referrerId.value(),
      },
    });
  }

  async startWatchingAd(data: TWatchingAdApiCallAction): Promise<void> {
    await this.fetchAction({
      actionName: WatchingAdActionName.action("start-watching-ad"),
      body: {
        refereeId: data.refereeId.value(),
        referrerId: data.referrerId.value(),
      },
    });
  }

  private async fetchAction(props: {
    actionName: WatchingAdActionName;
    body: IApiReqWatchingAdAction;
  }): Promise<void> {
    const { actionName, body } = props;
    const resp = await fetch(
      ApiRoutes.watchingAdSendAction(actionName.action),
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    const jsonResp = await getApiResponse(resp);
    if (!resp.ok) throw new Error(jsonResp.message);
  }
}
