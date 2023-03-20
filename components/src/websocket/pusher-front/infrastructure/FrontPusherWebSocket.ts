import { ErrorWebSocket } from "@/src/modules/websockets/pusher/domain/errors/ErrorWebSocket";
import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEvent, WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { UniqId } from "@/src/utils/UniqId";
import Pusher from "pusher-js";


export class PusherWebSocketJS {
  constructor(private pusher: Pusher) {}

  authUser(props: {
    onSuccess: (data: unknown) => void;
    onError: (data: unknown) => void;
  }) {
    this.pusher.signin();
    this.pusher.bind("pusher:signin_success", props.onSuccess);
    this.pusher.bind("pusher:error", props.onError);
  }

  authChannel(
    channelName: WebSocketChannel,
    props: {
      onSucced: (data: unknown) => void;
      onError: (data: unknown) => void;
    }
  ) {
    const channel = this.pusher.subscribe(channelName.name);
    channel.bind("pusher:subscription_succeeded", props.onSucced);
    channel.bind("pusher:subscription_error", props.onError);
  }

  listenEvent<T>(event: WebSocketEventName, handler:(data: T) => void) {
    //*https://pusher.com/docs/channels/using_channels/connection/#connection-states
    this.pusher.user.bind(event.name, handler);
  }

  listenConnectionEvents(props: {
    onConnect: (data: unknown) => void;
    onDisconnect: (data: unknown) => void;
    onFail: (data: unknown) => void;
  }) {
    this.pusher.connection.bind("connected", props.onConnect);
    this.pusher.connection.bind("failed", props.onFail);
    this.pusher.connection.bind("disconnected", props.onDisconnect);
  }

  async disconnect() {
    this.pusher.unbind_all();
    this.pusher.disconnect();
    const resp = await fetch(ApiRoutes.websocketDisconnect);
    if (!resp.ok) throw ErrorWebSocket.disconnecting();
  }

  async sendAdWatchedEvent(userId: UniqId) {
    await fetch(ApiRoutes.websocketAdWatched, {
      method: "PUT",
      body: JSON.stringify({
        user_id: userId,
      }),
    });
  }
}
