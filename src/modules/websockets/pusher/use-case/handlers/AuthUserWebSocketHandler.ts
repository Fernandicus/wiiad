import { UniqId } from "@/src/utils/UniqId";
import { PusherWebSocketId } from "../../domain/PusherWebSocketId";
import { AuthUserWebSocket } from "../AuthUserWebSocket";

export class AuthUserWebSocketHandler {
  constructor(private authUserSocket: AuthUserWebSocket) {}

  auth(props: { socketId: string; userId: string }) {
    return this.authUserSocket.auth({
      userId: new UniqId(props.userId),
      socketId: new PusherWebSocketId(props.socketId),
    });
  }
}
