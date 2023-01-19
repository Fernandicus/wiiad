import { GetCampaigns } from "../use-case/GetCampaigns";
import { GetCampaignsHandler } from "../use-case/handler/GetCampaignsHandler";
import { FetchAdvertiserApiCalls } from "./FetchAdvertiserApiCalls";

const fetch = new FetchAdvertiserApiCalls();
const getCampaigns = new GetCampaigns(fetch);
export const getCampaignsHandler = new GetCampaignsHandler(getCampaigns);
