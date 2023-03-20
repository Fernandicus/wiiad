import { PusherWebSocketJS } from "@/components/src/websocket/pusher-front/infrastructure/FrontPusherWebSocket";
import {
  WebSocketChannel,
  WebSocketChannels,
} from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import {
  WebSocketEvent,
  WebSocketEventName,
} from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { UniqId } from "@/src/utils/UniqId";
import Pusher, { Channel } from "pusher-js";
import { useState } from "react";

export const useAdWatcher = (webSocket: PusherWebSocketJS) => {
  const [connectionMessage, setConnectionMessage] = useState("");

  const authUser = () => {
    webSocket.authUser({
      onSuccess: (data: unknown) => {
        console.log("signin success");
      },
      onError(data) {
        console.log("signin Error");
      },
    });
  };

  const authChannel = () => {
    webSocket.authChannel(WebSocketChannel.watchAd(), {
      onSucced(data) {
        console.log("authChannel success");
      },
      onError(data) {
        console.log("authChannel error");
      },
    });
  };

  const listenUserEvents = () => {
    //*https://pusher.com/docs/channels/using_channels/connection/#connection-states

    webSocket.listenConnectionEvents({
      onConnect(data) {
        console.log("connect");
      },
      onDisconnect(data) {
        console.log("disconnect");
      },
      onFail(data) {
        console.log("fail");
      },
    });

    webSocket.listenEvent(
      WebSocketEventName.finishWatchingAd(),
      (data: { message: string; random: number }) => {
        setConnectionMessage(data.message);
      }
    );
  };

  const connectPusher = () => {
    //* 1- call pusher signin to authenticate the user
    authUser();
    //* 2- call pusher subscribe '[presence/private]-channelName' to authenticate the channelName
    authChannel();
    //* 3- bind pusher user to listen events
    listenUserEvents();
  };

  const closePusher = async () => {
    console.log("Pusher unsubscribing and disconnecting");
    await webSocket.disconnect();
  };

  const sendAdWatchedEvent = async (userId: string) => {
    await webSocket.sendAdWatchedEvent(new UniqId(userId));
  };

  return {
    closePusher,
    connectPusher,
    connectionMessage,
    sendAdWatchedEvent,
  };
};
