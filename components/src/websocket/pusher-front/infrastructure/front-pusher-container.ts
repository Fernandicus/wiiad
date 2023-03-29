import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { projectConfig } from "@/src/utils/projectConfig";
import Pusher from "pusher-js";
import { FrontWSSConnectChannel } from "../use-case/FrontWSSConnectChannel";
import { FrontWSSConnectUser } from "../use-case/FrontWSSConnectUser";
import { FrontWSSDisconnect } from "../use-case/FrontWSSDisconnect";
import { FrontWSSListenEvent } from "../use-case/FrontWSSListenEvent";
import { FrontWSSSendEvent } from "../use-case/FrontWSSSendEvent";
import { FrontWSSDisconnectHandler } from "../use-case/handlers/FrontWSSDisconnectHandler";
import { FrontWSSSendEventHandler } from "../use-case/handlers/FrontWSSSendEventHandler";
import { FrontPusherWSS } from "./FrontPusherWSS";

const wss = (props?: IApiReqWSSConnect) => {
  return new Pusher(projectConfig.PUSHER.key!, {
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
};

export const frontwss = (props?: IApiReqWSSConnect) =>
  FrontPusherWSS.getInstance(wss(props));
export const frontWSSConnectUser = () => new FrontWSSConnectUser(frontwss());

export const frontWSSConnectChannel = () =>
  new FrontWSSConnectChannel(frontwss());

export const frontWSSDisconnectHandler = () =>
  new FrontWSSDisconnectHandler(new FrontWSSDisconnect(frontwss()));

export const frontWSSSendEventHandler = () =>
  new FrontWSSSendEventHandler(new FrontWSSSendEvent(frontwss()));

export const frontWSSListenEvent = () => new FrontWSSListenEvent(frontwss());
