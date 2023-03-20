import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { AuthChannelWebSocket } from "../use-case/AuthChannelWebSocket";
import { AuthUserWebSocket } from "../use-case/AuthUserWebSocket";
import { DisconnectWebSocket } from "../use-case/DisconnectWebSocket";
import { AuthChannelWebSocketHandler } from "../use-case/handlers/AuthChannelWebSocketHandler";
import { AuthUserWebSocketHandler } from "../use-case/handlers/AuthUserWebSocketHandler";
import { DisconnectWebSocketHandler } from "../use-case/handlers/DisconnectWebSocketHandler";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { SendWebSocketEventHandler } from "../use-case/handlers/SendWebSocketEventHandler";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { SendWebSocketEvent } from "../use-case/SendWebSocketEvent";
import { pusher, PusherWebSocket } from "./PusherWebSocket";

const pusherWebSocket = new PusherWebSocket(pusher)
const authUserSocket = new AuthUserWebSocket(pusherWebSocket);
export const authUserSocketHandler = new AuthUserWebSocketHandler(authUserSocket);

const authChannelSocket = new AuthChannelWebSocket(pusherWebSocket);
export const authChannelSocketHandler = new AuthChannelWebSocketHandler(authChannelSocket);

const sendWebSocketEvent = new SendWebSocketEvent(pusherWebSocket);
export const sendWebSocketEventHandler = new SendWebSocketEventHandler(sendWebSocketEvent);

const disconnectWebSocket = new DisconnectWebSocket(pusherWebSocket);
export const disconnectWebSocketHandler = new DisconnectWebSocketHandler(disconnectWebSocket);

const watchAdTimerList = new WatchAdTimerList();
const insertUserWatchingAd = new InsertUserWatchingAd(watchAdTimerList);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(insertUserWatchingAd);
