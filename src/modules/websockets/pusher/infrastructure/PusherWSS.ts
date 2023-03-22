import { projectConfig } from "@/src/utils/projectConfig";
import { UniqId } from "@/src/utils/UniqId";
import Pusher from "pusher";
import {
  TPusherAuthChannel,
  TPusherAuthUser,
  TPusherSendEvent,
} from "../domain/types/types";

export class PusherWSS {
  constructor(private pusher: Pusher) {}

  authenticateUser(params: TPusherAuthUser): Pusher.UserAuthResponse {
    const { socketId, userId } = params;
    const authUserResponse = this.pusher.authenticateUser(socketId.id, {
      id: userId.id,
    });
    return authUserResponse;
  }

  authenticateChannel(params: TPusherAuthChannel): Pusher.ChannelAuthResponse {
    const { socketId, channelName } = params;
    const authChannelResponse = this.pusher.authorizeChannel(
      socketId.id,
      channelName.name,
    );
    return authChannelResponse;
  }

  async closeConnection(userId: UniqId): Promise<void> {
    const resp = await this.pusher.terminateUserConnections(userId.id);
  }

  async sendEventToUser(params: TPusherSendEvent): Promise<void> {
    const { event, userId, data } = params;
    const d = params.event
    const resp = await this.pusher.sendToUser(userId.id, event.event, data);
  }
}
