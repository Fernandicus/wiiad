import { TPusherAuthUser } from "../domain/types/types";
import { PusherWSS } from "../infrastructure/PusherWSS";

export class AuthUserWSS {
  constructor(private webSocketService: PusherWSS) {}

  auth(params: TPusherAuthUser): void {
    const { userId, socketId, onAuth } = params;
    this.webSocketService.authenticateUser({
      socketId,
      userId,
      onAuth,
    });
  }
}
