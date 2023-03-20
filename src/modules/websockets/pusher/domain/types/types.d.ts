export type TPusherAuthUser = {
  socketId: PusherWebSocketId;
  userId: UniqId;
};

export type TPusherAuthChannel = {
  socketId: PusherWebSocketId;
  channelName: WebSocketChannel;
};

export type TPusherSendEvent = {
  userId: UniqId;
  event: WebSocketEventName;
  data: object;
};
