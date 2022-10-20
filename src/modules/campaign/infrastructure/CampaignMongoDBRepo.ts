import { HydratedDocument } from "mongoose";
import { AdvertiserPropsPrimitives } from "../../advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignStatusType } from "../domain/value-objects/CampaignStatus";
import { CampaignModel, ICampaignModel } from "./CampaignModel";

export class CampaignMongoDBRepo implements ICampaignRepo {
  async launch(campaign: ICampaignPrimitives): Promise<void> {
    const campaignModel: HydratedDocument<ICampaignModel> =
      new CampaignModel<ICampaignModel>({
        _id: campaign.id,
        ...campaign,
      });
    await campaignModel.save();
  }

  async findByStatus(
    status: CampaignStatusType
  ): Promise<ICampaignPrimitives | null> {
    throw new Error("Method not implemented.");
  }

  async findByAdvertiserId(id: string): Promise<ICampaignPrimitives | null> {
    const campaign = await CampaignModel.findOne<ICampaignModel>({
      advertiserId: id,
    });
    if (!campaign) return null;
    return {
      id: campaign._id,
      adId: campaign.adId,
      advertiserId: campaign.advertiserId,
      status: campaign.status,
      promoters: campaign.promoters,
      watchers: campaign.watchers,
      budget: campaign.budget,
      metrics: campaign.metrics,
    };
  }
}
