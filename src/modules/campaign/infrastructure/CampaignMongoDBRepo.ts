import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { HydratedDocument } from "mongoose";
import { AdvertiserPropsPrimitives } from "../../advertiser/domain/Advertiser";
import { Campaign, ICampaignPrimitives } from "../domain/Campaign";
import { ICampaignRepo } from "../domain/ICampaignRepo";
import { CampaignBudget } from "../domain/value-objects/Budget";
import { CampaignMetrics } from "../domain/value-objects/CampaignMetrics";
import {
  CampaignStatus,
  CampaignStatusType,
} from "../domain/value-objects/CampaignStatus";
import { CampaignModel, ICampaignModel } from "./CampaignModel";

export class CampaignMongoDBRepo implements ICampaignRepo {
  async save(campaign: Campaign): Promise<void> {
    await CampaignModel.create({
      ...campaign.toPrimitives(),
      _id: campaign.id.id,
    } as ICampaignModel);
  }

  async findAllByStatus(status: CampaignStatus): Promise<Campaign[] | null> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      status: status.status,
    } as ICampaignModel);
    if (campaignModels.length == 0) return null;
    const campaigns = this.mapToCampaign(campaignModels);
    return campaigns;
  }

  async findAllByAdvertiserId(id: UniqId): Promise<Campaign[] | null> {
    const campaignModels = await CampaignModel.find<ICampaignModel>({
      advertiserId: id.id,
    } as ICampaignModel);
    if(campaignModels.length == 0) return null;
    const campaigns = this.mapToCampaign(campaignModels);
    return campaigns;
  }

  async byId(id: UniqId): Promise<Campaign | null> {
    const campaignModel = await CampaignModel.findById(id.id);
    if (!campaignModel) return null;
    return this.toCampaign(campaignModel);
  }

  async addReferral(params: {
    campaignId: UniqId;
    referralId: UniqId;
  }): Promise<void> {
    const campaign = await CampaignModel.findById(params.campaignId.id);
    if (campaign) {
      campaign.referrals.push(params.referralId.id);
      await campaign.save();
    }
  }

  async increaseViews(id: UniqId): Promise<void> {
    console.log(" increaseViews ");
    await CampaignModel.findByIdAndUpdate(id.id, {
      $inc: { "metrics.totalViews": 1 },
    });
  }

  async increaseClicks(id: UniqId): Promise<void> {
    await CampaignModel.findByIdAndUpdate(id.id, {
      $inc: { "metrics.totalClicks": 1 },
    });
  }

  private toCampaign(campaignModel: ICampaignModel): Campaign {
    return new Campaign({
      id: new UniqId(campaignModel._id),
      adId: new UniqId(campaignModel.adId),
      advertiserId: new UniqId(campaignModel.advertiserId),
      referrals: campaignModel.referrals.map(
        (referral) => new UniqId(referral)
      ),
      status: new CampaignStatus(campaignModel.status),
      budget: new CampaignBudget({
        clicks: campaignModel.budget.clicks,
        balance: new Balance(campaignModel.budget.balance),
      }),
      metrics: new CampaignMetrics({
        totalClicks: campaignModel.metrics.totalClicks,
        totalViews: campaignModel.metrics.totalViews,
      }),
    });
  }

  private mapToCampaign(campaignModels: ICampaignModel[]): Campaign[] {
    const campaigns = campaignModels.map((campaignModel) =>
      this.toCampaign(campaignModel)
    );
    return campaigns;
  }
}
