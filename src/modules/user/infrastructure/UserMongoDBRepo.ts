import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { BankAccount } from "../domain/BankAccount";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";
import { UserModel, IUserModel } from "./UserMode";

export class UserMongoDBRepo implements IUserRepo {
  async save(user: User): Promise<void> {
    await UserModel.create({
      ...user.toPrimitives(),
      _id: user.id.id,
    });
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      email: email.email,
    } as IUserModel);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  async findByUserName(name: Name): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      name: name.name,
    } as IUserModel);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  private toUser(userModel: IUserModel): User {
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
