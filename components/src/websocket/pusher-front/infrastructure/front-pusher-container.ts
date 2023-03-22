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
import { FrontPusherWebSocketService } from "./FrontPusherWebSocketService";
import { asClass, asFunction, createContainer, InjectionMode } from "awilix";

const pusherJS = (props?: IApiReqWebSocketConnect) =>
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

export const frontwss = (props?: IApiReqWebSocketConnect) =>
   FrontPusherWebSocketService.getInstance(pusherJS(props));

export const frontWebSocketConnectUser = new FrontWebSocketConnectUser(
  frontwss()
);

export const frontWebSocketConnectChannel = new FrontWebSocketConnectChannel(
  frontwss()
);

const frontWebSocketDisconnect = new FrontWebSocketDisconnect(frontwss());

export const frontWebSocketDisconnectHandler =
  new FrontWebSocketDisconnectHandler(frontWebSocketDisconnect);

const frontWebSocketSendEvent = new FrontWebSocketSendEvent(frontwss());

export const frontWebSocketSendEventHandler =
  new FrontWebSocketSendEventHandler(frontWebSocketSendEvent);

export const frontWebSocketListenEvent = new FrontWebSocketListenEvent(
  frontwss()
);

//! USING AWILIX
/* const container = createContainer();

container.register({
  wss: asFunction(pusherJS).singleton(),
  frontWebScoketService: asClass(FrontPusherWebSocketService),
  frontWebSocketConnectUser: asClass(FrontWebSocketConnectUser),
});
 */
