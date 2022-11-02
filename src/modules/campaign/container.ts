import { Campaign } from "./domain/Campaign";
import { CreateCampaignHandler } from "./handler/CreateCampaignHandler";
import { FindCampaignHandler } from "./handler/FindCampaignHandler";
import { UpdateCampaignMetricsHandler } from "./handler/UpdateCampaignMetricsHandler";
import { CampaignMongoDBRepo } from "./infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "./use-case/CreateCampaign";
import { FindCampaign } from "./use-case/FindCampaign";
import { UpdateCampaignMetrics } from "./use-case/UpdateCampaignMetrics";

const campaignRepo = new CampaignMongoDBRepo();
const createCampaign = new CreateCampaign(campaignRepo);
const findCampaign = new FindCampaign(campaignRepo)
const updateCampaignMetrics = new UpdateCampaignMetrics(campaignRepo)

export const createCampaignHandler = new CreateCampaignHandler(createCampaign);
export const findCampaignHandler = new FindCampaignHandler(findCampaign);
export const campaignMetricsHandler = new UpdateCampaignMetricsHandler(updateCampaignMetrics);