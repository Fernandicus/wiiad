import {
  frontWSSConnectChannel,
  frontWSSDisconnectHandler,
  frontWSSListenEvent,
  frontWSSSendEventHandler,
  frontWSSConnectUser,
  frontwss,
} from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";
import {
  IApiReqWSSConnect,
  TEventData,
  TWatchingAdEventData,
} from "@/src/modules/websockets/pusher/domain/types/types";
import { useEffect, useState } from "react";
import { useNotification } from "../useNotification";

interface IUseWatchingAd {
  disconnect: () => Promise<void>;
  connect: () => void;
  connectionMessage: string;
  events: {
    startWatchingAd: () => Promise<void>;
    finishWatchingAd: () => void;
  };
}

export const useWatchingAd = (
  data: IApiReqWSSConnect & { referrerId: string }
): IUseWatchingAd => {
   const [connectionMessage, setConnectionMessage] = useState(""); 
  const { setNotification } = useNotification();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const connectUser = () => {
    console.log("connectUser");
    frontWSSConnectUser().connect({
      onSuccess(data) {
        setNotification({message:"SignedIn",status:"info"})
      },
      onError(data) {
        setNotification({message:"Error SingingIn",status:"info"})
      },
    });
  };

  const connectChannel = () => {
    console.log("connectChannel");
    frontWSSConnectChannel().watchAd({
      onSuccess(data) {
        console.log("connectChannel success");
      },
      onError(data) {
        console.log("connectChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    console.log("listenUserEvents");
    frontWSSListenEvent().finishedWatchingAd((data: unknown) => {
      if (isEventData(data)) setNotification({message:data.message,status:"info"});
    });
  };

  const connect = () => {
    console.log("connect");
    frontwss(data);
    connectUser();
    connectChannel();
    listenUserEvents();
  };

  const disconnect = async () => {
    await frontWSSDisconnectHandler().disconnect(data.no_auth_user_id);
    setNotification({message:"Disconnected",status:"info"})
  };

  const startWatchingAd = async () => {
    frontWSSSendEventHandler().startWatchingAd({
      refereeValue: data.no_auth_user_id,
      referrerId: data.referrerId,
    });
    setNotification({message:"Waiting response ...",status:"info"})
  };

  const finishWatchingAd = async () => {
    frontWSSSendEventHandler().finishWatchingAd({
      refereeValue: data.no_auth_user_id,
      referrerId: data.referrerId,
    });
    setNotification({message:"Finish watching add",status:"info"})
  };

  return {
    disconnect,
    connect,
    connectionMessage,
    events: {
      startWatchingAd,
      finishWatchingAd,
    },
  };
};

function isEventData(
  value: unknown
): value is TEventData<TWatchingAdEventData> {
  return Object.keys(value as object).includes("message");
}
