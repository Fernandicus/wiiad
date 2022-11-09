import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ProfilePic } from "@/src/domain/ProfilePic";
import { Role } from "@/src/domain/Role";
import { BankAccount } from "@/src/modules/user/domain/BankAccount";
import { IUserPrimitives, User } from "@/src/modules/user/domain/User";
import {
  UserModel,
  IUserModel,
} from "@/src/modules/user/infrastructure/UserMode";
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

  async getAll(): Promise<User[] | null> {
    const usersModel = await UserModel.find<IUserModel>();
    if (usersModel.length == 0) return null;
    const users = usersModel.map((user): User => {
      return new User({
        id: new UniqId(user._id),
        email: new Email(user.email),
        name: new Name(user.name),
        role: new Role(user.role),
        bankAccount: user.bankAccount
          ? new BankAccount(user.bankAccount!)
          : undefined,
        profilePic: new ProfilePic(user.profilePic),
      });
    });
    return users;
  }
}
