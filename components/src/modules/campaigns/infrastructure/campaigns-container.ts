import { GetCampaigns } from "../use-case/GetCampaigns";
import { GetCampaignsHandler } from "../use-case/handler/GetCampaignsHandler";
import { FetchCampaignsApiCalls } from "./FetchCampaignsApiCalls";

const fetch = new FetchCampaignsApiCalls();
const getCampaigns = new GetCampaigns(fetch);
export const getCampaignsHandler = new GetCampaignsHandler(getCampaigns);
