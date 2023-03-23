import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { AuthChannelWSS } from "../use-case/AuthChannelWSS";
import { AuthUserWSS } from "../use-case/AuthUserWSS";
import { DisconnectWSS } from "../use-case/DisconnectWSS";
import { AuthChannelWSSHandler } from "../use-case/handlers/AuthChannelWSSHandler";
import { AuthUserWSSHandler } from "../use-case/handlers/AuthUserWSSHandler";
import { DisconnectWSSHandler } from "../use-case/handlers/DisconnectWSSHandler";
import { SendWSEvent } from "../domain/services/SendWSEvent";
import { PusherWSS } from "./PusherWSS";
import { projectConfig } from "@/src/utils/projectConfig";
import Pusher from "pusher";
import { StartWatchingAdWSEvent } from "../use-case/StartWatchingAdWSEvent";
import { InsertUserWatchingAd } from "../domain/services/InsertUserWatchingAd";
import { StartWatchingAdWSEventHandler } from "../use-case/handlers/StartWatchingAdWSEventHandler";

const { appId, cluster, key, secret } = projectConfig.PUSHER;
const wss = new Pusher({
  appId: appId!,
  key: key!,
  secret: secret!,
  cluster: cluster!,
});

const pusherWSS = new PusherWSS(wss);
const authUserWSS = new AuthUserWSS(pusherWSS);
export const authUserWSSHandler = new AuthUserWSSHandler(authUserWSS);

const authChannelWSS = new AuthChannelWSS(pusherWSS);
export const authChannelWSSHandler = new AuthChannelWSSHandler(authChannelWSS);

const sendWSSEvent = new SendWSEvent(pusherWSS);
const watchAdTimerList = new WatchAdTimerList();
const insertUserWatchingAd = new InsertUserWatchingAd(watchAdTimerList);
const startWatchingAdWSEvent = new StartWatchingAdWSEvent(
  sendWSSEvent,
  insertUserWatchingAd
);
export const startWatchingAdWSEventHandler = new StartWatchingAdWSEventHandler(
  startWatchingAdWSEvent
);

const disconnectWSS = new DisconnectWSS(pusherWSS);
export const disconnectWSSHandler = new DisconnectWSSHandler(disconnectWSS);
