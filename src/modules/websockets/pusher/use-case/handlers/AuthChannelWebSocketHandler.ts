import { UniqId } from "@/src/utils/UniqId";
import { PusherWebSocketId } from "../../domain/PusherWebSocketId";
import { WebSocketChannel } from "../../domain/WebSocketChannel";
import { AuthChannelWebSocket } from "../AuthChannelWebSocket";

export class AuthChannelWebSocketHandler {
  constructor(private authChannel: AuthChannelWebSocket) {}

  watchAd(props: { socketId: string }) {
    const { socketId } = props;
    return this.authChannel.auth({
      channelName: WebSocketChannel.watchAd(),
      socketId: new PusherWebSocketId(socketId),
    });
  }
}
