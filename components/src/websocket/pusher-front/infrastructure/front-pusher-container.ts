import { IApiReqWebSocketConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { projectConfig } from "@/src/utils/projectConfig";
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
  new Pusher(projectConfig.PUSHER.key!, {
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


const frontWebSocket = (props: IApiReqWebSocketConnect) =>
  PusherWebSocketJS.getInstance(pusherJS(props)); 

export const frontWebSocketConnectUser = (props: IApiReqWebSocketConnect) =>
  new FrontWebSocketConnectUser(frontWebSocket(props));

export const frontWebSocketConnectChannel = (props: IApiReqWebSocketConnect) =>
  new FrontWebSocketConnectChannel(frontWebSocket(props));

const frontWebSocketDisconnect = (props: IApiReqWebSocketConnect) =>
  new FrontWebSocketDisconnect(frontWebSocket(props));

export const frontWebSocketDisconnectHandler = (
  props: IApiReqWebSocketConnect
) => new FrontWebSocketDisconnectHandler(frontWebSocketDisconnect(props));

const frontWebSocketSendEvent = (props: IApiReqWebSocketConnect) =>
  new FrontWebSocketSendEvent(frontWebSocket(props));

export const frontWebSocketSendEventHandler = (
  props: IApiReqWebSocketConnect
) => new FrontWebSocketSendEventHandler(frontWebSocketSendEvent(props));

export const frontWebSocketListenEvent = (props: IApiReqWebSocketConnect) =>
  new FrontWebSocketListenEvent(frontWebSocket(props));
