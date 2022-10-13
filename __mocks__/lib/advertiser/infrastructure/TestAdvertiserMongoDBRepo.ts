import { AdvertiserModel } from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestAdvertiserMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestAdvertiserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(AdvertiserModel.modelName, AdvertiserModel.schema)
    );
    return new TestAdvertiserMongoDBRepo();
  }
}
