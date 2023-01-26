import { CreateCampaignHandler } from "../use-case/handlers/CreateCampaignHandler";
import { FindCampaignHandler } from "../use-case/handlers/FindCampaignHandler";
import { UpdateCampaignMetricsHandler } from "../use-case/handlers/UpdateCampaignMetricsHandler";
import { CampaignMongoDBRepo } from "./db/CampaignMongoDBRepo";
import { CreateCampaign } from "../use-case/CreateCampaign";
import { FindCampaign } from "../use-case/FindCampaign";
import { UpdateCampaignMetrics } from "../use-case/UpdateCampaignMetrics";
import { RemoveCampaign } from "../use-case/RemoveCampaign";
import { RemoveCampaignHandler } from "../use-case/handlers/RemoveCampaignHandler";

const campaignRepo = new CampaignMongoDBRepo();
const createCampaign = new CreateCampaign(campaignRepo);
const findCampaign = new FindCampaign(campaignRepo);
const removeCampaign = new RemoveCampaign(campaignRepo);
const updateCampaignMetrics = new UpdateCampaignMetrics(campaignRepo);

export const createCampaignHandler = new CreateCampaignHandler(createCampaign);
export const findCampaignHandler = new FindCampaignHandler(findCampaign);
export const campaignMetricsHandler = new UpdateCampaignMetricsHandler(
  updateCampaignMetrics
);
export const removeCampaignHandler = new RemoveCampaignHandler(removeCampaign);
