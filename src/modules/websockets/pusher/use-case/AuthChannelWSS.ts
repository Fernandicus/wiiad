import { IWebSocketService } from "../domain/interface/IWebSocketService";
import { TPusherAuthChannel } from "../domain/types/types";

export class AuthChannelWSS {
  constructor(private pusherWebSocket: IWebSocketService) {}

  auth(props: TPusherAuthChannel) :void{
    const { channelName, socketId, onAuth } = props;
     this.pusherWebSocket.authenticateChannel({
      channelName,
      socketId,
      onAuth,
    });
  }
}
