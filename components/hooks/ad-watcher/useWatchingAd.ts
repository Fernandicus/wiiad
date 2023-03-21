import {
  frontWebSocket,
  frontWebSocketConnectChannel,
  frontWebSocketConnectUser,
  frontWebSocketDisconnectHandler,
  frontWebSocketListenEvent,
  frontWebSocketSendEventHandler,
} from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";
import { IApiReqWebSocketConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { UniqId } from "@/src/utils/UniqId";
import { useState } from "react";

interface IUseWatchingAd {
  disconnect: () => Promise<void>;
  connect: () => void;
  connectionMessage: string;
  sendAdWatchedEvent: (userId: string) => Promise<void>;
}

export const useWatchingAd = (
  userData: IApiReqWebSocketConnect
): IUseWatchingAd => {
  const webSocket = frontWebSocket(userData);

  const [connectionMessage, setConnectionMessage] = useState("");

  const connectUser = () => {
    frontWebSocketConnectUser(webSocket).connect({
      onSuccess(data) {
        console.log("signin success");
      },
      onError(data) {
        console.log("signin Error");
      },
    });
  };

  const connectChannel = () => {
    const connectChannel = frontWebSocketConnectChannel(webSocket);
    connectChannel.watchAd({
      onSuccess(data) {
        console.log("connectChannel success");
      },
      onError(data) {
        console.log("connectChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    const listenEvent = frontWebSocketListenEvent(webSocket);
    listenEvent.finishedWatchingAd((data: { message: string }) => {
      console.log(data);
      setConnectionMessage(data.message);
    });
  };

  const connect = () => {
    connectUser();
    connectChannel();
    listenUserEvents();
  };

  const disconnect = async () => {
    frontWebSocketDisconnectHandler(webSocket).disconnect(
      userData.no_auth_user_id
    );
  };

  const sendAdWatchedEvent = async (userId: string) => {
    const sendEvent = frontWebSocketSendEventHandler(webSocket);
    sendEvent.finishedWatchingAd(userId);
  };

  return {
    disconnect,
    connect,
    connectionMessage,
    sendAdWatchedEvent,
  };
};
