import { UserModel } from "@/src/modules/user/infrastructure/UserMode";
import mongoose from "mongoose";
import { TestMongoDB } from "../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestUserMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestUserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(UserModel.modelName, UserModel.schema)
    );
    return new TestUserMongoDBRepo();
  }
}