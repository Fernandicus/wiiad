import { InitWatchingAdTimer } from "../use-case/InitWatchingAdTimer";
import { InsertUserWatchingAd } from "../use-case/InsertUserWatchingAd";
import { InsertUserWatchingAdHandler } from "../use-case/handlers/InsertUserWatchingAdHandler";
import { FinishWatchingAd } from "../use-case/FinishWatchingAd";
import { FinishWatchingAdHandler } from "../use-case/handlers/FinishWatchingAdHandler";
import {
  increaseReferralBalance,
  updateReferral,
} from "@/src/modules/referrals/infrastructure/referral-container";
import {
  findCampaign,
  updateCampaignMetrics,
} from "@/src/modules/campaign/infrastructure/campaign-container";
import { addReferralToCampaign } from "@/src/common/infrastructure/common-src-container";
import { MongoDBWatchingAdRepo } from "./db/MongoDBWatchingAdRepo";
import { InitWatchingAdTimerHandler } from "../use-case/handlers/InitWatchingAdTimerHandler";
import { InitializeWatchingAd } from "../use-case/InitializeWatchingAd";
import { findUser } from "@/src/modules/users/user/container";
import {
  findAd,
  getAdDuration,
} from "@/src/modules/ad/infraestructure/ad-container";
import { SelectCampaignToWatch } from "../use-case/SelectCampaignToWatch";
import { InitializeWatchingAdHandler } from "../use-case/handlers/InitializeWatchingAdHandler";
import { FindWatchingAd } from "../use-case/FindWatchingAd";
import { FindWatchingAdHandler } from "../use-case/handlers/FindWatchingAdHandler";
import { StartWatchingAd } from "../use-case/StartWatchingAd";
import { StartWatchingAdHandler } from "../use-case/handlers/StartWatchingAdHandler";
import { RemoveWatchingAd } from "../use-case/RemoveWatchingAd";
import { UpdateWatchingAdStakeHoldersData } from "../use-case/UpdateWatchingAdStakeHoldersData";

const watchAdRepo = new MongoDBWatchingAdRepo();

export const insertUserWatchingAd = new InsertUserWatchingAd(watchAdRepo);
export const insertUserWatchingAdHandler = new InsertUserWatchingAdHandler(
  insertUserWatchingAd
);
export const initWatchingAdTimer = new InitWatchingAdTimer(watchAdRepo);
export const initWatchingAdTimerHandler = new InitWatchingAdTimerHandler(
  initWatchingAdTimer
);

export const findWatchingAd = new FindWatchingAd(watchAdRepo);
export const findWatchingAdHandler = new FindWatchingAdHandler(findWatchingAd);
const removeWatchingAd = new RemoveWatchingAd(watchAdRepo);

const updateWatchingAdStakeHolders = new UpdateWatchingAdStakeHoldersData({
  increaseBalance: increaseReferralBalance,
  addReferralToCampaign,
  findCampaign,
  updateReferral
});

const finishWatchingAd = new FinishWatchingAd({
  updateWatchingAdStakeHolders,
  findWatchingAd,
  removeWatchingAd,
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

const initializeWatchingAd = new InitializeWatchingAd({
  findUser,
  getAdDuration,
  insertUserWatchingAd,
  selectCampaign,
});

export const initializeWatchingAdHandler = new InitializeWatchingAdHandler(
  initializeWatchingAd
);

const startWatchingAd = new StartWatchingAd({
  findWatchingAd,
  initWatchingAdTimer,
  updateCampaignMetrics,
  updateReferral,
});

export const startWatchingAdHandler = new StartWatchingAdHandler(
  startWatchingAd
);
