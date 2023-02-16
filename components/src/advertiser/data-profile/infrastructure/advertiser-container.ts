import { GetAdvertiserProfileData } from "../use-case/GetAdvertiserProfileData";
import { GetAdvertiserProfileDataHandler } from "../use-case/handler/GetAdvertiserProfileDataHandler";
import { UpdateAdvertiserProfileDataHandler } from "../use-case/handler/UpdateAdvertiserProfileDataHandler";
import { UpdateAdvertiserProfileData } from "../use-case/UpdateAdvertiserProfileData";
import { FetchAdvertiserApiCalls } from "./FetchAdvertiserApiCalls";

const fetch = new FetchAdvertiserApiCalls();
const getCampaigns = new GetAdvertiserProfileData(fetch);
export const getAdvertiserProfileDataHandler = new GetAdvertiserProfileDataHandler(getCampaigns);

const updateAdvertiserProf = new UpdateAdvertiserProfileData(fetch);
export const updateAdvertiserProfHandler = new UpdateAdvertiserProfileDataHandler(updateAdvertiserProf);
