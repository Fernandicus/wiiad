import { ErrorWebSocket } from "@/src/modules/websockets/pusher/domain/errors/ErrorWebSocket";
import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { UniqId } from "@/src/utils/UniqId";
import Pusher from "pusher-js";
import {
  IFrontWSS,
  TWSConnectOptions,
} from "../domain/interface/IFrontWSS";

export class FrontPusherWSS implements IFrontWSS {
  private static singletonInstance: FrontPusherWSS;
  private constructor(private pusher: Pusher) {}

  static getInstance(pusher: Pusher): FrontPusherWSS {
    if (!this.singletonInstance) {
      this.singletonInstance = new FrontPusherWSS(pusher);
    }
    return this.singletonInstance;
  }

  connectUser({ onError, onSuccess }: TWSConnectOptions): void {
    this.pusher.signin();
    this.pusher.bind("pusher:signin_success", onSuccess);
    this.pusher.bind("pusher:error", onError);
  }

  //? https://pusher.com/docs/channels/using_channels/connection/#connection-states
  connectChannel(
    channelName: WebSocketChannel,
    { onError, onSuccess }: TWSConnectOptions
  ): void {
    const channel = this.pusher.subscribe(channelName.name);
    channel.bind("pusher:subscription_succeeded", onSuccess);
    channel.bind("pusher:subscription_error", onError);
  }

  async disconnect(userId: UniqId): Promise<void> {
    const data: IApiReqWSSConnect = { no_auth_user_id: userId.id };
    this.pusher.unbind_all();
    this.pusher.disconnect();
    const resp = await fetch(ApiRoutes.websocketDisconnect, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!resp.ok) throw ErrorWebSocket.disconnecting();
  }

  async sendEvent<T extends object>(
    event: WebSocketEventName,
    data: T
  ): Promise<void> {
    await fetch(ApiRoutes.websocketSendEvent(event.getName()), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  //? https://pusher.com/docs/channels/using_channels/connection/#connection-states
  listenEvent<T>(event: WebSocketEventName, handler: (data: T) => void): void {
    this.pusher.user.bind(event.event, handler);
  }
}
