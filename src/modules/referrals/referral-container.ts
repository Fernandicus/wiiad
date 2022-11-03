import { CreateReferralHandler } from "./handler/CreateReferralHandler";
import { FindReferralHandler } from "./handler/FindReferralHandler";
import { UpdateReferralHandler } from "./handler/UpdateReferralHandler";
import { ReferralMongoDBRepo } from "./infrastructure/ReferralMongoDBRepo";
import { CreateReferral } from "./use-case/CreateReferral";
import { FindReferral } from "./use-case/FindReferral";
import { UpdateReferral } from "./use-case/UpdateReferral";

const referralRepo = new ReferralMongoDBRepo();
const createReferral = new CreateReferral(referralRepo);
const findReferral = new FindReferral(referralRepo);
const updateReferral = new UpdateReferral(referralRepo);

export const createReferralHandler = new CreateReferralHandler(createReferral);
export const findReferralHandler = new FindReferralHandler(findReferral);
export const updateReferralHandler = new UpdateReferralHandler(updateReferral);