import { IUserPrimitives } from "@/src/modules/user/domain/User";
import {
  UserModel,
  UserModelProps,
} from "@/src/modules/user/infrastructure/UserMode";
import mongoose, { HydratedDocument } from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";

export class TestUserMongoDBRepo extends TestMongoDB {
  static async init(): Promise<TestUserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(UserModel.modelName, UserModel.schema)
    );
    return new TestUserMongoDBRepo();
  }

  async save(user: IUserPrimitives): Promise<void> {
    const userModel: HydratedDocument<UserModelProps> =
      new UserModel<UserModelProps>({
        _id: user.id,
        ...user,
      });
    await userModel.save();
  }

  async saveMany(users: IUserPrimitives[]): Promise<void> {
    const userModels = users.map((user): UserModelProps => {
      return {
        _id: user.id,
        ...user,
      };
    });
    await UserModel.insertMany(userModels);
  }
}
