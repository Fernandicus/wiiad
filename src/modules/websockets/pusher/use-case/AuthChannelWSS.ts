import { TPusherAuthChannel } from "../domain/types/types";
import {
  PusherWSS,
} from "../infrastructure/PusherWSS";

export class AuthChannelWSS {
  constructor(private pusherWebSocket: PusherWSS) {}

  auth(props: TPusherAuthChannel) :void{
    const { channelName, socketId, onAuth } = props;
     this.pusherWebSocket.authenticateChannel({
      channelName,
      socketId,
      onAuth,
    });
  }
}
