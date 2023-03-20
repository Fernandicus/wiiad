import { TPusherAuthUser } from "../domain/types/types";
import { PusherWebSocket } from "../infrastructure/PusherWebSocket";

export class AuthUserWebSocket {
  constructor(private webSocketService: PusherWebSocket) {}

  auth(params: TPusherAuthUser) {
    const { userId, socketId } = params;
    return this.webSocketService.authenticateUser({
      socketId,
      userId,
    });
  }
}
