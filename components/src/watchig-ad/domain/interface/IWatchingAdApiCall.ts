import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";

export interface IWatchingAdApiCall {
  sendEvent<T extends object>(props: {
    event: WatchingAdActionName;
    data: T;
  }): Promise<void>;
}
