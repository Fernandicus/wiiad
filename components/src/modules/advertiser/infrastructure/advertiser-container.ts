import { GetAdvertiserProfileData } from "../use-case/GetAdvertiserProfileData";
import { GetAdvertiserProfileDataHandler } from "../use-case/handler/GetAdvertiserProfileDataHandler";
import { FetchAdvertiserApiCalls } from "./FetchAdvertiserApiCalls";

const fetch = new FetchAdvertiserApiCalls();
const getCampaigns = new GetAdvertiserProfileData(fetch);
export const getAdvertiserProfileDataHandler = new GetAdvertiserProfileDataHandler(getCampaigns);
