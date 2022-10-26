import { AdvertiserModel } from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignModel,
  ICampaignModel,
} from "@/src/modules/campaign/infrastructure/CampaignModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestCampaignMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestCampaignMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(CampaignModel.modelName, CampaignModel.schema)
    );
    return new TestCampaignMongoDBRepo();
  }

  async saveMany(campaigns: ICampaignPrimitives[]): Promise<void> {
    const campaignModels = campaigns.map((campaign): ICampaignModel => {
      return {
        ...campaign,
        _id: campaign.id,
      };
    });
    await CampaignModel.insertMany(campaignModels);
  }
}
