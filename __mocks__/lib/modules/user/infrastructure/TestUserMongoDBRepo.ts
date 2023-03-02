import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import {
  UserModel,
  IUserModel,
} from "@/src/modules/users/user/infrastructure/UserModel";
import { UniqId } from "@/src/utils/UniqId";
import mongoose, { HydratedDocument } from "mongoose";
import { TestMongoDB } from "../../../../../__mocks__/lib/infrastructure/TestMongoDB";
import { TestUserRepository } from "../domain/TestUserRepository";

export class TestUserMongoDBRepo
  extends TestMongoDB
  implements TestUserRepository
{
  static async init(): Promise<TestUserMongoDBRepo> {
    await this.connectAndCleanModel(
      mongoose.model(UserModel.modelName, UserModel.schema)
    );
    return new TestUserMongoDBRepo();
  }

  async save(user: User): Promise<void> {
    await UserModel.create({
      _id: user.id.id,
      ...user.toPrimitives(),
    } as IUserModel);
  }

  async saveMany(users: User[]): Promise<void> {
    const userModels = users.map((user): IUserModel => {
      return {
        _id: user.id.id,
        ...user.toPrimitives(),
      };
    });
    await UserModel.insertMany<IUserModel>(userModels);
  }

  async getAllUsers(): Promise<User[] | null> {
    const usersModel = await UserModel.find<IUserModel>({role: RoleType.USER} as IUserModel);
    if (usersModel.length == 0) return null;
    const users = usersModel.map((user): User => {
      return new User({
        id: new UniqId(user._id),
        email: new Email(user.email),
        name: new Name(user.name),
        role: new Role(user.role),
        profilePic: new ProfilePic(user.profilePic),
      });
    });
    return users;
  }

  async getAllAdvertisers(): Promise<User[] | null> {
    await TestMongoDB.connectMongoDB();
    const advertiserModels = await UserModel.find<IUserModel>({role: RoleType.BUSINESS} as IUserModel);
    if (advertiserModels.length == 0) return null;
    const advertisers = advertiserModels.map((advertiser) => {
      return new User({
        id: new UniqId(advertiser._id),
        name: new Name(advertiser.name),
        email: new Email(advertiser.email),
        role: new Role(advertiser.role),
        profilePic: new ProfilePic(advertiser.profilePic),
      });
    });
    return advertisers;
  }
}
