import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { AuthChannelWSS } from "../use-case/AuthChannelWSS";
import { AuthUserWSS } from "../use-case/AuthUserWSS";
import { DisconnectWSS } from "../use-case/DisconnectWSS";
import { AuthChannelWSSHandler } from "../use-case/handlers/AuthChannelWSSHandler";
import { AuthUserWSSHandler } from "../use-case/handlers/AuthUserWSSHandler";
import { DisconnectWSSHandler } from "../use-case/handlers/DisconnectWSSHandler";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { SendWSEventHandler } from "../use-case/handlers/SendWSEventHandler";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { SendWSEvent } from "../use-case/SendWSEvent";
import { PusherWSS } from "./PusherWSS";
import { projectConfig } from "@/src/utils/projectConfig";
import Pusher from "pusher";

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
export const sendWSSEventHandler = new SendWSEventHandler(sendWSSEvent);

const disconnectWSS = new DisconnectWSS(pusherWSS);
export const disconnectWSSHandler = new DisconnectWSSHandler(disconnectWSS);

const watchAdTimerList = new WatchAdTimerList();
const insertUserWatchingAd = new InsertUserWatchingAd(watchAdTimerList);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(
  insertUserWatchingAd
);
