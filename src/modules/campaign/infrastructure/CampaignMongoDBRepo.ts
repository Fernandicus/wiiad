import { HydratedDocument } from "mongoose";
import { AdvertiserPropsPrimitives } from "../../advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignStatusType } from "../domain/value-objects/CampaignStatus";
import { CampaignModel, ICampaignModel } from "./CampaignModel";

export class CampaignMongoDBRepo implements ICampaignRepo {
  async save(campaign: ICampaignPrimitives): Promise<void> {
    const campaignModel: HydratedDocument<ICampaignModel> =
      new CampaignModel<ICampaignModel>({
        _id: campaign.id,
        ...campaign,
      });
    await campaignModel.save();
  }

  async findByStatus(
    status: string
  ): Promise<ICampaignPrimitives[]> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      status,
    });
    const campaigns = this.mapToPrimitives(campaignModels);
    return campaigns;
  }

  async findAllByAdvertiserId(id: string): Promise<ICampaignPrimitives[]> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      advertiserId: id,
    });
    const campaigns = this.mapToPrimitives(campaignModels);
    return campaigns;
  }

  private mapToPrimitives(
    campaignModels: ICampaignModel[]
  ): ICampaignPrimitives[] {
    const campaigns = campaignModels.map((campaign) => {
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
    });
    return campaigns;
  }
}
