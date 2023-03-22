import { UniqId } from "@/src/utils/UniqId";
import { PusherWSSId } from "../../domain/PusherWSSId";
import { WebSocketChannel } from "../../domain/WebSocketChannel";
import { AuthChannelWSS } from "../AuthChannelWSS";

export class AuthChannelWSSHandler {
  constructor(private authChannel: AuthChannelWSS) {}

  watchAd(props: { socketId: string; onAuth: (data: unknown) => void }) {
    const { socketId, onAuth } = props;
    return this.authChannel.auth({
      channelName: WebSocketChannel.watchAd(),
      socketId: new PusherWSSId(socketId),
      onAuth,
    });
  }
}
