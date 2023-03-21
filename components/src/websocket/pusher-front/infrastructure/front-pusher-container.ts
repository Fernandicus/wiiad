import { IApiReqWebSocketConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import Pusher from "pusher-js";
import { IFrontWebSocket } from "../domain/interface/IFrontWebSocket";
import { FrontWebSocketConnectChannel } from "../use-case/FrontWebSocketConnectChannel";
import { FrontWebSocketConnectUser } from "../use-case/FrontWebSocketConnectUser";
import { FrontWebSocketDisconnect } from "../use-case/FrontWebSocketDisconnect";
import { FrontWebSocketListenEvent } from "../use-case/FrontWebSocketListenEvent";
import { FrontWebSocketSendEvent } from "../use-case/FrontWebSocketSendEvent";
import { FrontWebSocketDisconnectHandler } from "../use-case/handlers/FrontWebSocketDisconnectHandler";
import { FrontWebSocketSendEventHandler } from "../use-case/handlers/FrontWebSocketSendEventHandler";
import { PusherWebSocketJS } from "./FrontPusherWebSocket";

const pusherJS = (props: IApiReqWebSocketConnect) =>
  new Pusher("b013a88394c7777b271d", {
    cluster: "eu",
    userAuthentication: {
      params: props,
      endpoint: ApiRoutes.websocketUserAuthentication,
      transport: "ajax",
    },
    channelAuthorization: {
      params: props,
      endpoint: ApiRoutes.websocketChannelAuthorization,
      transport: "ajax",
    },
  });

export const frontWebSocket = (props: IApiReqWebSocketConnect) =>
  new PusherWebSocketJS(pusherJS(props));

export const frontWebSocketConnectUser = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketConnectUser(webSocket);

export const frontWebSocketConnectChannel = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketConnectChannel(webSocket);

const frontWebSocketDisconnect = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketDisconnect(webSocket);

export const frontWebSocketDisconnectHandler = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketDisconnectHandler(frontWebSocketDisconnect(webSocket));

const frontWebSocketSendEvent = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketSendEvent(webSocket);

export const frontWebSocketSendEventHandler = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketSendEventHandler(frontWebSocketSendEvent(webSocket));

export const frontWebSocketListenEvent = (webSocket: IFrontWebSocket) =>
  new FrontWebSocketListenEvent(webSocket);
