import { WebSocketChannel } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";

export type TWSConnectOptions<T = unknown> = {
  onSuccess: (data: T) => void;
  onError: (data: T) => void;
};

export interface IFrontWebSocket {
  connectUser<T>(props: TWSConnectOptions<T>): void;

  connectChannel<T>(
    channelName: WebSocketChannel,
    props: TWSConnectOptions<T>
  ): void;

  disconnect(): void;

  listenEvent<T>(event: WebSocketEventName, handler: (data: T) => void): void;

  sendEvent<T extends object>(event: WebSocketEventName, data: T): Promise<void>;
}
