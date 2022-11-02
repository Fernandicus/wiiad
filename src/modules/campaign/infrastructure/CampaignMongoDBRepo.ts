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

  async findByStatus(status: string): Promise<ICampaignPrimitives[]> {
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

  async byId(id: string): Promise<ICampaignPrimitives | null> {
    const campaignModel = await CampaignModel.findById<ICampaignModel>(id);
    if (!campaignModel) return null;
    return {
      id: campaignModel._id,
      adId: campaignModel.adId,
      advertiserId: campaignModel.advertiserId,
      status: campaignModel.status,
      referrals: campaignModel.referrals,
      watchers: campaignModel.watchers,
      budget: campaignModel.budget,
      metrics: campaignModel.metrics,
    };
  }

  async addWatcher(params: {
    campaignId: string;
    watcherId: string;
  }): Promise<void> {
    const campaign: HydratedDocument<ICampaignModel> | null =
      await CampaignModel.findById(params.campaignId);
    if (campaign) {
      campaign.watchers.push(params.watcherId);
      await campaign.save();
    }
  }

  async addReferral(params: {
    campaignId: string;
    referralId: string;
  }): Promise<void> {
    const campaign: HydratedDocument<ICampaignModel> | null =
      await CampaignModel.findById(params.campaignId);
    if (campaign) {
      campaign.referrals.push(params.referralId);
      await campaign.save();
    }
  }

  async increaseViews(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async increaseClicks(id: string): Promise<void> {
    throw new Error("Method not implemented.");
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
        referrals: campaign.referrals,
        watchers: campaign.watchers,
        budget: campaign.budget,
        metrics: campaign.metrics,
      };
    });
    return campaigns;
  }
}
