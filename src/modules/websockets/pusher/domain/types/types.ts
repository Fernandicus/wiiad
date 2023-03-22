import { UniqId } from "@/src/utils/UniqId";
import { PusherWSSId } from "../PusherWSSId";
import { WebSocketChannel } from "../WebSocketChannel";
import { WebSocketEventName } from "../WebSocketEventName";

export type TPusherAuthUser = {
  socketId: PusherWSSId;
  userId: UniqId;
};

export type TPusherAuthChannel = {
  socketId: PusherWSSId;
  channelName: WebSocketChannel;
};

export type TPusherSendEvent = {
  userId: UniqId;
  event: WebSocketEventName;
  data: object;
};

export interface IApiReqWSSConnect {
  no_auth_user_id: string;
}