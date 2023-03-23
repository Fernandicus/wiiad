import { UniqId } from "@/src/utils/UniqId";
import { PusherWSSId } from "../PusherWSSId";
import { WebSocketChannel } from "../WebSocketChannel";
import { WebSocketEventName } from "../WebSocketEventName";

export type TPusherAuthUser<T = unknown> = {
  socketId: PusherWSSId;
  userId: UniqId;
  onAuth: (data: T) => void;
};

export type TPusherAuthChannel<T = unknown> = {
  socketId: PusherWSSId;
  channelName: WebSocketChannel;
  onAuth: (data: T) => void;
};

export type TPusherSendEvent<T = undefined> = {
  userId: UniqId;
  event: WebSocketEventName;
  data: TEventData<T>;
};

export interface IApiReqWSSConnect {
  no_auth_user_id: string;
}

export type TEventData<T> = {
  message: string;
  data?: { [K in keyof T]: T[K] };
};

export type TWatchingAdEventData = { status: number };
