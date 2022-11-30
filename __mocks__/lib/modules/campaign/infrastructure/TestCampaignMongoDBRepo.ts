import { Balance } from "@/src/domain/Balance";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import {
  CampaignModel,
  ICampaignModel,
} from "@/src/modules/campaign/infrastructure/db/CampaignModel";
import { UniqId } from "@/src/utils/UniqId";
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

  async saveMany(campaigns: Campaign[]): Promise<void> {
    await TestMongoDB.connectMongoDB();
    const campaignModels = campaigns.map((campaign): ICampaignModel => {
      return {
        ...campaign.toPrimitives(),
        _id: campaign.id.id,
      };
    });
    await CampaignModel.insertMany<ICampaignModel>(campaignModels);
  }

  async getByStatus(status: CampaignStatus): Promise<Campaign[] | null> {
    await TestMongoDB.connectMongoDB();

    const campaignModel = await CampaignModel.find<ICampaignModel>({
      status: status.status,
    } as ICampaignModel);

    if (campaignModel.length == 0) return null;

    const campaigns = campaignModel.map((campaign): Campaign => {
      return new Campaign({
        id: new UniqId(campaign._id),
        adId: new UniqId(campaign.adId),
        advertiserId: new UniqId(campaign.advertiserId),
        referrals: campaign.referrals.map((referral) => new UniqId(referral)),
        status: new CampaignStatus(campaign.status),
        budget: new CampaignBudget({
          clicks: campaign.budget.clicks,
          balance: new Balance(campaign.budget.balance),
        }),
        metrics: new CampaignMetrics({
          totalClicks: campaign.metrics.totalClicks,
          totalViews: campaign.metrics.totalViews,
        }),
      });
    });
    return campaigns;
  }
}
