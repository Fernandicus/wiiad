import { GetReferralData } from "../use-case/GetReferralData";
import { GetReferralDataHandler } from "../use-case/handler/GetReferralDataHandler";
import { FetchUserApiCalls } from "./FetchUserApiCalls";

const repo = new FetchUserApiCalls();
const getReferralData = new GetReferralData(repo);
export const getReferralDataHandler = new GetReferralDataHandler(
  getReferralData
);
