import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignModel,
  ICampaignModel,
} from "@/src/modules/campaign/infrastructure/CampaignModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestCampaignRepository } from "../domain/TestCampaignRepository";

export class TestCampaignMongoDBRepo
  extends TestMongoDB
  implements TestCampaignRepository
{
  static async init(): Promise<TestCampaignMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(CampaignModel.modelName, CampaignModel.schema)
    );
    return new TestCampaignMongoDBRepo();
  }

  async saveMany(campaigns: ICampaignPrimitives[]): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const campaignModels = campaigns.map((campaign): ICampaignModel => {
      return {
        ...campaign,
        _id: campaign.id,
      };
    });
    await CampaignModel.insertMany(campaignModels);
  }

  async getByStatus(status: string): Promise<ICampaignPrimitives[] | null> {
    await TestMongoDB.connectMongoDB();
    const campaignModel = await CampaignModel.find<ICampaignModel>({ status });
    if (campaignModel.length == 0) return null;
    const campaigns = campaignModel.map((campaign): ICampaignPrimitives => {
      return {
        id: campaign._id,
        adId: campaign.adId,
        advertiserId: campaign.advertiserId,
        referrals: [...campaign.referrals],
        status: campaign.status,
        watchers: [...campaign.watchers],
        budget: {
          maxClicks: campaign.budget.maxClicks,
          moneyToSpend: campaign.budget.moneyToSpend,
        },
        metrics: {
          totalClicks: campaign.metrics.totalClicks,
          totalViews: campaign.metrics.totalViews,
        }
      };
    });
    return campaigns;
  }
}
