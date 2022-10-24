import { Campaign } from "./domain/Campaign";
import { CreateCampaignHandler } from "./handler/CreateCampaignHandler";
import { FindCampaignHandler } from "./handler/FindCampaignHandler";
import { CampaignMongoDBRepo } from "./infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "./use-case/CreateCampaign";
import { FindCampaign } from "./use-case/FindCampaign";

const campaignRepo = new CampaignMongoDBRepo();
const createCampaign = new CreateCampaign(campaignRepo);
const findCampaign = new FindCampaign(campaignRepo)

export const createCampaignHandler = new CreateCampaignHandler(createCampaign);
export const findCampaignHandler = new FindCampaignHandler(findCampaign);
