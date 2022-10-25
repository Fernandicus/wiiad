import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  AdvertiserModel,
  AdvertiserModelProps,
} from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestAdvertiserMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestAdvertiserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(AdvertiserModel.modelName, AdvertiserModel.schema)
    );
    return new TestAdvertiserMongoDBRepo();
  }

  async saveMany(
    advertiserPrimitives: AdvertiserPropsPrimitives[]
  ): Promise<void> {
    const models = advertiserPrimitives.map(
      (advertiser): AdvertiserModelProps => {
        return {
          _id: advertiser.id,
          ...advertiser,
        };
      }
    );
    await AdvertiserModel.insertMany(models);
  }
}
