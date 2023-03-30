import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { IWatchingAdApiCall } from "../domain/interface/IWatchingAdApiCall";
import { getApiResponse } from "@/src/utils/helpers";
import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";

export class WatchingAdFetchApiCall implements IWatchingAdApiCall {
  async sendEvent<T extends object>(props: {
    event: WatchingAdActionName;
    data: T;
  }): Promise<void> {
    const resp = await fetch(
      ApiRoutes.watchingAdSendAction(props.event.action),
      {
        method: "PUT",
        body: JSON.stringify(props.data),
      }
    );
    console.log(resp.status);
    const json = await getApiResponse(resp);
    console.log(json.message);
  }
}
