import { TPusherAuthChannel } from "../domain/types/types";
import {
  PusherWebSocket,
} from "../infrastructure/PusherWebSocket";

export class AuthChannelWebSocket {
  constructor(private pusherWebSocket: PusherWebSocket) {}

  auth(props: TPusherAuthChannel) {
    const { channelName, socketId } = props;
    return this.pusherWebSocket.authenticateChannel({
      channelName,
      socketId
    });
  }
}
