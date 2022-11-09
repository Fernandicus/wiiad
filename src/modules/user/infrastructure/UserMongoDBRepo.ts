import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ProfilePic } from "@/src/domain/ProfilePic";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { HydratedDocument } from "mongoose";
import { BankAccount } from "../domain/BankAccount";
import { IUserRepo } from "../domain/IUserRepo";
import { IUserPrimitives, User } from "../domain/User";
import { UserModel, UserModelProps } from "./UserMode";

export class UserMongoDBRepo implements IUserRepo {
  async save(user: User): Promise<void> {
    await UserModel.create({
      ...user.toPrimitives(),
      _id: user.id.id,
    });
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userModel = await UserModel.findOne<UserModelProps>({
      email: email.email,
    } as UserModelProps);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  async findByUserName(name: Name): Promise<User | null> {
    const userModel = await UserModel.findOne<UserModelProps>({
      name: name.name,
    } as UserModelProps);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  private toUser(userModel: UserModelProps): User {
    return new User({
      id: new UniqId(userModel._id),
      email: new Email(userModel.email),
      name: new Name(userModel.name),
      role: new Role(userModel.role),
      bankAccount: userModel.bankAccount
        ? new BankAccount(userModel.bankAccount!)
        : undefined,
      profilePic: new ProfilePic(userModel.profilePic),
    });
  }
}
