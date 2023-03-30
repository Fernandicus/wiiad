import { StartWatchingAd } from "../use-case/StartWatchingAd";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { FinishWatchingAd } from "../use-case/FinishWatchingAd";
import { FinishWatchingAdHandler } from "../use-case/handlers/FinishWatchingAdHandler";
import {
  increaseReferralBalance,
  updateReferral,
} from "@/src/modules/referrals/infrastructure/referral-container";
import { findCampaign } from "@/src/modules/campaign/infrastructure/campaign-container";
import { addReferralToCampaign } from "@/src/common/infrastructure/common-src-container";
import { MongoDBWatchingAdRepo } from "./db/MongoDBWatchingAdRepo";
import { StartWatchingAdHandler } from "../use-case/handlers/StartWatchingAdHandler";
import { InitWatchingAd } from "../use-case/InitWatchingAd";
import { findUser } from "@/src/modules/users/user/container";
import {
  findAd,
  getAdDuration,
} from "@/src/modules/ad/infraestructure/ad-container";
import { SelectCampaignToWatch } from "../use-case/SelectCampaignToWatch";
import { InitWatchingAdHandler } from "../use-case/handlers/InitWatchingAdHandler";

const watchAdRepo = new MongoDBWatchingAdRepo();

export const insertUserWatchingAd = new InsertUserWatchingAd(watchAdRepo);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(
  insertUserWatchingAd
);
const startWatchingAdWSEvent = new StartWatchingAd(watchAdRepo);
export const startWatchingAdWSEventHandler = new StartWatchingAdHandler(
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

const selectCampaign = new SelectCampaignToWatch({
  findAd,
  findCampaign,
  findUser,
  updateReferral,
});

const initWatchingAd = new InitWatchingAd({
  findUser,
  getAdDuration,
  insertUserWatchingAd,
  selectCampaign,
});

export const initWatchingAdHandler = new InitWatchingAdHandler(initWatchingAd);
