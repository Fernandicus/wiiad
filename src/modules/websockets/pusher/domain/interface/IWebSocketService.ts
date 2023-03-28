import { UniqId } from "@/src/common/domain/UniqId";
import {
    TEventData,
  TPusherAuthChannel,
  TPusherAuthUser,
  TPusherSendEvent,
} from "../types/types";

export interface IWebSocketService {
  authenticateUser(params: TPusherAuthUser): void;

  authenticateChannel(params: TPusherAuthChannel): void;

  closeConnection(userId: UniqId): Promise<void>;

  sendEventToUser<T>(params: TPusherSendEvent<T>): Promise<void>;
}
