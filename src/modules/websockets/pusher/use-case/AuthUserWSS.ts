import { TPusherAuthUser } from "../domain/types/types";
import { PusherWSS } from "../infrastructure/PusherWSS";

export class AuthUserWSS {
  constructor(private webSocketService: PusherWSS) {}

  auth(params: TPusherAuthUser) {
    const { userId, socketId, onAuth } = params;
    return this.webSocketService.authenticateUser({
      socketId,
      userId,
      onAuth,
    });
  }
}
