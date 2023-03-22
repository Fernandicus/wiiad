import { TPusherAuthChannel } from "../domain/types/types";
import {
  PusherWSS,
} from "../infrastructure/PusherWSS";

export class AuthChannelWSS {
  constructor(private pusherWebSocket: PusherWSS) {}

  auth(props: TPusherAuthChannel) {
    const { channelName, socketId, onAuth } = props;
    return this.pusherWebSocket.authenticateChannel({
      channelName,
      socketId,
      onAuth,
    });
  }
}
