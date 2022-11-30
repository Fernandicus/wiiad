import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";
import { UserModel, IUserModel } from "./UserModel";

export class UserMongoDBRepo implements IUserRepo {
  async save(user: User): Promise<void> {
    await UserModel.create({
      ...user.toPrimitives(),
      _id: user.id.id,
    });
  }

  async findUserByEmail(email: Email): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      email: email.email,
      role: RoleType.USER,
    } as IUserModel);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  async findAdvertiserByEmail(email: Email): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      email: email.email,
      role: RoleType.BUSINESS,
    } as IUserModel);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  async findUserByName(name: Name): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      name: name.name,
      role: RoleType.USER,
    } as IUserModel);

    if (!userModel) return null;

    return this.toUser(userModel);
  }

  async findAdvertiserByName(name: Name): Promise<User | null> {
    const userModel = await UserModel.findOne<IUserModel>({
      name: name.name,
      role: RoleType.BUSINESS,
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
      profilePic: new ProfilePic(userModel.profilePic),
    });
  }
}
