import { CreateReferralHandler } from "../use-case/handlers/CreateReferralHandler";
import { FindReferralHandler } from "../use-case/handlers/FindReferralHandler";
import { UpdateReferralHandler } from "../use-case/handlers/UpdateReferralHandler";
import { ReferralMongoDBRepo } from "./ReferralMongoDBRepo";
import { CreateReferral } from "../use-case/CreateReferral";
import { FindReferral } from "../use-case/FindReferral";
import { UpdateReferral } from "../use-case/UpdateReferral";

const referralRepo = new ReferralMongoDBRepo();
const createReferral = new CreateReferral(referralRepo);
const findReferral = new FindReferral(referralRepo);
const updateReferral = new UpdateReferral(referralRepo);

export const createReferralHandler = new CreateReferralHandler(createReferral);
export const findReferralHandler = new FindReferralHandler(findReferral);
export const updateReferralHandler = new UpdateReferralHandler(updateReferral);