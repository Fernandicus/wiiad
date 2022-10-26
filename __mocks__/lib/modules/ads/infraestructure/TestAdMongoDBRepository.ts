import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  AdModel,
  AdModelProps,
} from "@/src/modules/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../infrastructure/TestMongoDB";
import { TestAdRepository } from "../domain/TestAdRepository";

export class TestAdMongoDBRepository
  extends TestMongoDB
  implements TestAdRepository
{
  static async init(): Promise<TestAdMongoDBRepository> {
    await this.connectAndCleanModel(
      mongoose.model(AdModel.modelName, AdModel.schema)
    );
    return new TestAdMongoDBRepository();
  }

  static async disconnect(): Promise<void> {
    await this.disconnectMongoDB();
  }

  async saveMany(adsPrimitives: AdPropsPrimitives[]): Promise<void> {
    const models = adsPrimitives.map((ad): AdModelProps => {
      return {
        _id: ad.id,
        ...ad,
      };
    });
    await AdModel.insertMany(models);
  }

  async getAllAds(): Promise<AdPropsPrimitives[] | null> {
    const ads = await AdModel.find<AdModelProps>();
    if (ads.length == 0) return null;
    const adsPrimitives = ads.map((ad): AdPropsPrimitives => {
      return {
        id: ad._id,
        advertiserId: ad.advertiserId,
        description: ad.description,
        image: ad.image,
        redirectionUrl: ad.redirectionUrl,
        segments: ad.segments,
        title: ad.title,
      };
    });
    return adsPrimitives;
  }
}
