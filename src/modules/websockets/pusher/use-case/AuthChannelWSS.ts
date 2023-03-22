import { TPusherAuthChannel } from "../domain/types/types";
import {
  PusherWSS,
} from "../infrastructure/PusherWSS";

export class AuthChannelWSS {
  constructor(private pusherWebSocket: PusherWSS) {}

  auth(props: TPusherAuthChannel) {
    const { channelName, socketId } = props;
    return this.pusherWebSocket.authenticateChannel({
      channelName,
      socketId
    });
  }
}
