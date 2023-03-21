import { IFrontWebSocket } from "@/components/src/websocket/pusher-front/domain/interface/IFrontWebSocket";
import {
  frontWebSocketConnectChannel,
  frontWebSocketConnectUser,
  frontWebSocketDisconnect,
  frontWebSocketListenEvent,
  frontWebSocketSendEvent,
} from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";
import { PusherWebSocketJS } from "@/components/src/websocket/pusher-front/infrastructure/FrontPusherWebSocket";
import {
  WebSocketChannel,
  WebSocketChannels,
} from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import Pusher, { Channel } from "pusher-js";
import { useState } from "react";

export const useAdWatcher = (webSocket: IFrontWebSocket) => {
  const frontWebSocket = webSocket;
  const [connectionMessage, setConnectionMessage] = useState("");

  const connectUser = () => {
    frontWebSocketConnectUser(frontWebSocket).connect({
      onSuccess(data) {
        console.log("signin success");
      },
      onError(data) {
        console.log("signin Error");
      },
    });
  };

  const authChannel = () => {
    frontWebSocketConnectChannel(webSocket).watchAd({
      onSuccess(data) {
        console.log("authChannel success");
      },
      onError(data) {
        console.log("authChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    frontWebSocketListenEvent(webSocket).finishedWatchingAd(
      (data: { message: string }) => {
        console.log(data);
        setConnectionMessage(data.message);
      }
    );
  };

  const connect = () => {
    connectUser();
    authChannel();
    listenUserEvents();
  };

  const closePusher = async () => {
    frontWebSocketDisconnect(webSocket).disconnect();
  };

  const sendAdWatchedEvent = async (userId: string) => {
    frontWebSocketSendEvent(webSocket).finishedWatchingAd(new UniqId(userId));
  };

  return {
    closePusher,
    connect,
    connectionMessage,
    sendAdWatchedEvent,
  };
};
