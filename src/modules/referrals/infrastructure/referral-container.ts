import { CreateReferralHandler } from "../use-case/handlers/CreateReferralHandler";
import { FindReferralHandler } from "../use-case/handlers/FindReferralHandler";
import { UpdateReferralHandler } from "../use-case/handlers/UpdateReferralHandler";
import { ReferralMongoDBRepo } from "./db/ReferralMongoDBRepo";
import { CreateReferral } from "../use-case/CreateReferral";
import { FindReferral } from "../use-case/FindReferral";
import { UpdateReferral } from "../use-case/UpdateReferral";
import { IncreaseReferralBalance } from "../use-case/IncreaseReferralBalance";

export const referralRepo = new ReferralMongoDBRepo();
export const createReferral = new CreateReferral(referralRepo);
export const findReferral = new FindReferral(referralRepo);
export const updateReferral = new UpdateReferral(referralRepo);

export const createReferralHandler = new CreateReferralHandler(createReferral);
export const findReferralHandler = new FindReferralHandler(findReferral);
export const updateReferralHandler = new UpdateReferralHandler(updateReferral);

export const increaseReferralBalance = new IncreaseReferralBalance(updateReferral);
