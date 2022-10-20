import { Campaign } from "./domain/Campaign";
import { CreateCampaignHandler } from "./handler/CreateCampaignHandler";
import { CampaignMongoDBRepo } from "./infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "./use-case/CreateCampaign";

const campaignRepo = new CampaignMongoDBRepo();
const createCampaign = new CreateCampaign(campaignRepo);

export const createCampaignHandler = new CreateCampaignHandler(createCampaign);
