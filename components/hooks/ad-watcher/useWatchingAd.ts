import {
  //frontWebSocket,
  frontWebSocketConnectChannel,
  frontWebSocketConnectUser,
  frontWebSocketDisconnectHandler,
  frontWebSocketListenEvent,
  frontWebSocketSendEventHandler,
  frontwss,
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
  const [connectionMessage, setConnectionMessage] = useState("");

  const connectUser = () => {
    frontWebSocketConnectUser.connect({
      onSuccess(data) {
        setConnectionMessage("SignedIn");
      },
      onError(data) {
        setConnectionMessage("Error SingingIn");
      },
    });
  };

  const connectChannel = () => {
    frontWebSocketConnectChannel.watchAd({
      onSuccess(data) {
        console.log("connectChannel success");
      },
      onError(data) {
        console.log("connectChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    frontWebSocketListenEvent.finishedWatchingAd(
      (data: { message: string }) => {
        setConnectionMessage(data.message);
      }
    );
  };

  const connect = () => {
    frontwss(userData);
    connectUser();
    connectChannel();
    listenUserEvents();
  };

  const disconnect = async () => {
    await frontWebSocketDisconnectHandler.disconnect(userData.no_auth_user_id);
    setConnectionMessage("Disconnected");
  };

  const sendAdWatchedEvent = async (userId: string) => {
    frontWebSocketSendEventHandler.finishedWatchingAd(userId);
  };

  return {
    disconnect,
    connect,
    connectionMessage,
    sendAdWatchedEvent,
  };
};
