import { CreateCampaignHandler } from "../use-case/handlers/CreateCampaignHandler";
import { FindCampaignHandler } from "../use-case/handlers/FindCampaignHandler";
import { UpdateCampaignDataHandler } from "../use-case/handlers/UpdateCampaignDataHandler";
import { CampaignMongoDBRepo } from "./db/CampaignMongoDBRepo";
import { CreateCampaign } from "../use-case/CreateCampaign";
import { FindCampaign } from "../use-case/FindCampaign";
import { UpdateCampaignData } from "../use-case/UpdateCampaignData";
import { RemoveCampaign } from "../use-case/RemoveCampaign";
import { RemoveCampaignHandler } from "../use-case/handlers/RemoveCampaignHandler";

export const campaignRepo = new CampaignMongoDBRepo();
export const createCampaign = new CreateCampaign(campaignRepo);
export const findCampaign = new FindCampaign(campaignRepo);
export const removeCampaign = new RemoveCampaign(campaignRepo);
export const updateCampaignMetrics = new UpdateCampaignData(campaignRepo);

export const createCampaignHandler = new CreateCampaignHandler(createCampaign);
export const findCampaignHandler = new FindCampaignHandler(findCampaign);
export const campaignMetricsHandler = new UpdateCampaignDataHandler(
  updateCampaignMetrics
);
export const removeCampaignHandler = new RemoveCampaignHandler(removeCampaign);
