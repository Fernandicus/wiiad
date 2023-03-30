import { StartWatchingAdWSEvent } from "../use-case/StartWatchingAdWSEvent";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { StartWatchingAdWSEventHandler } from "../use-case/handlers/StartWatchingAdWSEventHandler";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { FinishWatchingAd } from "../use-case/FinishWatchingAd";
import { FinishWatchingAdHandler } from "../use-case/handlers/FinishWatchingAdHandler";
import { increaseReferralBalance } from "@/src/modules/referrals/infrastructure/referral-container";
import { findCampaign } from "@/src/modules/campaign/infrastructure/campaign-container";
import { addReferralToCampaign } from "@/src/common/infrastructure/common-src-container";
import { MongoDBWatchingAdRepo } from "./MongoDBWatchingAdRepo";

const watchAdRepo = new MongoDBWatchingAdRepo();

export const insertUserWatchingAd = new InsertUserWatchingAd(watchAdRepo);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(
  insertUserWatchingAd
);
const startWatchingAdWSEvent = new StartWatchingAdWSEvent(watchAdRepo);
export const startWatchingAdWSEventHandler = new StartWatchingAdWSEventHandler(
  startWatchingAdWSEvent
);

const finishWatchingAd = new FinishWatchingAd({
  watchAdRepo: watchAdRepo,
  findCampaign: findCampaign,
  increaseBalance: increaseReferralBalance,
  addReferralToCampaign: addReferralToCampaign,
});
export const finishWatchingAdHandler = new FinishWatchingAdHandler(
  finishWatchingAd
);
