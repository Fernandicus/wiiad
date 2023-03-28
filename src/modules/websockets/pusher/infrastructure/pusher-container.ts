import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { AuthChannelWSS } from "../use-case/AuthChannelWSS";
import { AuthUserWSS } from "../use-case/AuthUserWSS";
import { DisconnectWSS } from "../use-case/DisconnectWSS";
import { AuthChannelWSSHandler } from "../use-case/handlers/AuthChannelWSSHandler";
import { AuthUserWSSHandler } from "../use-case/handlers/AuthUserWSSHandler";
import { DisconnectWSSHandler } from "../use-case/handlers/DisconnectWSSHandler";
import { SendWSEvent } from "../use-case/SendWSEvent";
import { PusherWSS } from "./PusherWSS";
import { projectConfig } from "@/src/utils/projectConfig";
import Pusher from "pusher";
import { StartWatchingAdWSEvent } from "../use-case/StartWatchingAdWSEvent";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { StartWatchingAdWSEventHandler } from "../use-case/handlers/StartWatchingAdWSEventHandler";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { SendWSEventHandler } from "../use-case/handlers/SendWSEventHandler";
import { FinishWatchingAd } from "../use-case/FinishWatchingAd";
import { FinishWatchingAdHandler } from "../use-case/handlers/FinishWatchingAdHandler";
import {
  findReferral,
  increaseReferralBalance,
} from "@/src/modules/referrals/infrastructure/referral-container";
import {
  findCampaign,
  updateCampaignMetrics,
} from "@/src/modules/campaign/infrastructure/campaign-container";
import { addReferralToCampaign } from "@/src/common/infrastructure/common-src-container";

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
const watchAdTimerList = new WatchAdTimerList();
export const insertUserWatchingAd = new InsertUserWatchingAd(
  watchAdTimerList,
  sendWSSEvent
);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(
  insertUserWatchingAd
);
const startWatchingAdWSEvent = new StartWatchingAdWSEvent(watchAdTimerList);
export const startWatchingAdWSEventHandler = new StartWatchingAdWSEventHandler(
  startWatchingAdWSEvent
);

const finishWatchingAd = new FinishWatchingAd({
  watchingAdList: watchAdTimerList,
  findCampaign: findCampaign,
  increaseBalance: increaseReferralBalance,
  addReferralToCampaign: addReferralToCampaign,
});
export const finishWatchingAdHandler = new FinishWatchingAdHandler(
  finishWatchingAd
);

const disconnectWSS = new DisconnectWSS(pusherWSS);
export const disconnectWSSHandler = new DisconnectWSSHandler(disconnectWSS);
