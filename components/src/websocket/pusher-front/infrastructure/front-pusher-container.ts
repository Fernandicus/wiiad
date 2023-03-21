import { ApiRoutes } from "@/src/utils/ApiRoutes";
import Pusher from "pusher-js";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";
import { FrontWebSocketConnectChannel } from "../use-case/FrontWebSocketConnectChannel";
import { FrontWebSocketConnectUser } from "../use-case/FrontWebSocketConnectUser";
import { FrontWebSocketDisconnect } from "../use-case/FrontWebSocketDisconnect";
import { FrontWebSocketListenEvent } from "../use-case/FrontWebSocketListenEvent";
import { FrontWebSocketSendEvent } from "../use-case/FrontWebSocketSendEvent";
import { PusherWebSocketJS } from "./FrontPusherWebSocket";

type TWebSocketAuthProps = {
  userAuthParams?: object;
  channelAuthParams: object;
};

const pusherJS = (props: TWebSocketAuthProps) =>
  new Pusher("b013a88394c7777b271d", {
    cluster: "eu",
    userAuthentication: {
      params: props.userAuthParams,
      endpoint: ApiRoutes.websocketUserAuthentication,
      transport: "ajax",
    },
    channelAuthorization: {
      params: props.channelAuthParams,
      endpoint: ApiRoutes.websocketChannelAuthorization,
      transport: "ajax",
    },
  });

export const frontWebSocket = (props: TWebSocketAuthProps) =>
  new PusherWebSocketJS(pusherJS(props));

//Todo: Add use-cases
//ListenEvents, Disconnect, ...

export const frontWebSocketConnectUser = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketConnectUser(webSocket);

export const frontWebSocketConnectChannel = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketConnectChannel(webSocket);

export const frontWebSocketDisconnect = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketDisconnect(webSocket);

export const frontWebSocketSendEvent = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketSendEvent(webSocket);

export const frontWebSocketListenEvent = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketListenEvent(webSocket);
