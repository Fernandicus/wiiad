import {
  frontWSSConnectChannel,
  frontWSSDisconnectHandler,
  frontWSSListenEvent,
  frontWSSSendEventHandler,
  frontWSSConnectUser,
  frontwss,
} from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";
import { IApiReqWSSConnect } from "@/src/modules/websockets/pusher/domain/types/types";
import { useState } from "react";

interface IUseWatchingAd {
  disconnect: () => Promise<void>;
  connect: () => void;
  connectionMessage: string;
  sendStartWatchingAdEvent: (userId: string) => Promise<void>;
}

export const useWatchingAd = (userData: IApiReqWSSConnect): IUseWatchingAd => {
  const [connectionMessage, setConnectionMessage] = useState("");

  const connectUser = () => {
    frontWSSConnectUser.connect({
      onSuccess(data) {
        setConnectionMessage("SignedIn");
      },
      onError(data) {
        setConnectionMessage("Error SingingIn");
      },
    });
  };

  const connectChannel = () => {
    frontWSSConnectChannel.watchAd({
      onSuccess(data) {
        console.log("connectChannel success");
      },
      onError(data) {
        console.log("connectChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    frontWSSListenEvent.finishedWatchingAd((data: { message: string }) => {
      setConnectionMessage(data.message);
    });
  };

  const connect = () => {
    frontwss(userData);
    connectUser();
    connectChannel();
    listenUserEvents();
  };

  const disconnect = async () => {
    await frontWSSDisconnectHandler.disconnect(userData.no_auth_user_id);
    setConnectionMessage("Disconnected");
  };

  const sendStartWatchingAdEvent = async (userId: string) => {
    frontWSSSendEventHandler.startWatchingAd(userId);
  };

  return {
    disconnect,
    connect,
    connectionMessage,
    sendStartWatchingAdEvent,
  };
};
