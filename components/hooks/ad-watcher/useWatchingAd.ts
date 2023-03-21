import {
  //frontWebSocket,
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
  const [connectionMessage, setConnectionMessage] = useState("");

  const connectUser = () => {
    frontWebSocketConnectUser(userData).connect({
      onSuccess(data) {
        setConnectionMessage("SignedIn")
      },
      onError(data) {
        setConnectionMessage("Error SingingIn")
      },
    });
  };

  const connectChannel = () => {
    const connectChannel = frontWebSocketConnectChannel(userData);
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
    const listenEvent = frontWebSocketListenEvent(userData);
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
    await frontWebSocketDisconnectHandler(userData).disconnect(
      userData.no_auth_user_id
    );
    setConnectionMessage("Disconnected")
  };

  const sendAdWatchedEvent = async (userId: string) => {
    const sendEvent = frontWebSocketSendEventHandler(userData);
    sendEvent.finishedWatchingAd(userId);
  };

  return {
    disconnect,
    connect,
    connectionMessage,
    sendAdWatchedEvent,
  };
};
