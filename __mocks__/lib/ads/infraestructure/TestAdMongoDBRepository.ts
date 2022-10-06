import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestAdMongoDBRepository extends TestMongoDB {
  static async connectAndClean(): Promise<TestAdMongoDBRepository> {
    this.connectAndCleanModel(mongoose.model(AdModel.name, AdModel.schema));
    return new TestAdMongoDBRepository();
  }

  async saveMany(adsModel: AdModelProps[]): Promise<void> {
    await AdModel.insertMany(adsModel);
  }
}
