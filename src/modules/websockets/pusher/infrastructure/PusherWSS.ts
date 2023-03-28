import { projectConfig } from "@/src/utils/projectConfig";
import { UniqId } from "@/src/common/domain/UniqId";
import Pusher from "pusher";
import { IWebSocketService } from "../domain/interface/IWebSocketService";
import {
  TEventData,
  TPusherAuthChannel,
  TPusherAuthUser,
  TPusherSendEvent,
} from "../domain/types/types";

export class PusherWSS implements IWebSocketService {
  constructor(private pusher: Pusher) {}

  authenticateUser(params: TPusherAuthUser<Pusher.UserAuthResponse>): void {
    const { socketId, userId, onAuth } = params;
    const authUserResponse = this.pusher.authenticateUser(socketId.id, {
      id: userId.id,
    });
    onAuth(authUserResponse);
  }

  authenticateChannel(
    params: TPusherAuthChannel<Pusher.ChannelAuthResponse>
  ): void {
    const { socketId, channelName, onAuth } = params;
    const authChannelResponse = this.pusher.authorizeChannel(
      socketId.id,
      channelName.name
    );
    onAuth(authChannelResponse);
  }

  async closeConnection(userId: UniqId): Promise<void> {
    const resp = await this.pusher.terminateUserConnections(userId.id);
  }

  async sendEventToUser<T>(params: TPusherSendEvent<T>): Promise<void> {
    const { event, userId, data } = params;
    const d = params.event;
    const resp = await this.pusher.sendToUser(userId.id, event.event, data);
  }
}
