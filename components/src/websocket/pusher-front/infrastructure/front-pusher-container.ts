import Pusher from "pusher-js";
import { PusherWebSocketJS } from "./FrontPusherWebSocket";

type TWebSocketAuthProps = {
  userAuthParams?: object;
  channelAuthParams: object;
};

const pusherJS = (props: TWebSocketAuthProps) =>
  new Pusher("b013a88394c7777b271d", {
    cluster: "eu",
    userAuthentication: {
      endpoint: `/api/v1/channel-events/auth-user`,
      transport: "ajax",
      params: props.userAuthParams,
    },
    channelAuthorization: {
      endpoint: `/api/v1/channel-events/auth-channel`,
      transport: "ajax",
      params: props.channelAuthParams,
    },
  });

export const frontWebSocket = (props: TWebSocketAuthProps) =>
  new PusherWebSocketJS(pusherJS(props));

//Todo: Add use-cases
//ListenEvents, Disconnect, ...
