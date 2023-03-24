import { IWebSocketService } from "../domain/interface/IWebSocketService";
import { TPusherAuthUser } from "../domain/types/types";

export class AuthUserWSS {
  constructor(private webSocketService: IWebSocketService) {}

  auth(params: TPusherAuthUser): void {
    const { userId, socketId, onAuth } = params;
    this.webSocketService.authenticateUser({
      socketId,
      userId,
      onAuth,
    });
  }
}
