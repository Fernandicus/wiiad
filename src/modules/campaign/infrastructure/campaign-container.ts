import { CreateCampaignHandler } from "../use-case/handlers/CreateCampaignHandler";
import { FindCampaignHandler } from "../use-case/handlers/FindCampaignHandler";
import { UpdateCampaignDataHandler } from "../use-case/handlers/UpdateCampaignDataHandler";
import { CampaignMongoDBRepo } from "./db/CampaignMongoDBRepo";
import { CreateCampaign } from "../use-case/CreateCampaign";
import { FindCampaign } from "../use-case/FindCampaign";
import { UpdateCampaignData } from "../use-case/UpdateCampaignData";
import { RemoveCampaign } from "../use-case/RemoveCampaign";
import { RemoveCampaignHandler } from "../use-case/handlers/RemoveCampaignHandler";
import { SelectCampaignToWatch } from "../../../watching-ad/use-case/SelectCampaignToWatch";
import { findAd } from "../../ad/infraestructure/ad-container";
import { findUser, findUserHandler } from "../../users/user/container";
import { updateReferral } from "../../referrals/infrastructure/referral-container";

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
export const selectCampaignToWatch = new SelectCampaignToWatch({
  findAd: findAd,
  findCampaign,
  findUser: findUser,
  updateReferral: updateReferral,
});
