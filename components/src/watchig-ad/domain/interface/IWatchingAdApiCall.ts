import { WatchingAdActionName } from "@/src/watching-ad/domain/WebSocketEventName";

export interface IWatchingAdApiCall {
  sendEvent<T extends object>(
    event: WatchingAdActionName,
    data: T
  ): Promise<void>;
}
