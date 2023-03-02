import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";
import { IUpdateUserProfileProps } from "../use-case/UpdateUser";
import { UserModel, IUserModel } from "./UserModel";

export class UserMongoDBRepo implements IUserRepo {
  async findUserById(id: UniqId): Promise<Maybe<User>> {
    const userFound = await UserModel.findById(id.id);
    if (!userFound) return Maybe.nothing();
    return Maybe.some(this.toUser(userFound));
  }

  async findAdvertiserById(id: UniqId): Promise<Maybe<User>> {
    const userFound = await UserModel.findById(id.id);
    if (!userFound) return Maybe.nothing();
    return Maybe.some(this.toUser(userFound));
  }

  async updateEmail(params: { id: UniqId; newEmail: Email }): Promise<void> {
    const { newEmail, id } = params;

    const body: Partial<IUserModel> = {
      email: newEmail.email,
    };

    await UserModel.updateOne({ _id: id.id }, { $set: body });
  }

  async updateProfile(params: IUpdateUserProfileProps): Promise<void> {
    const { userId, data } = params;
    const { name, profilePic } = data;

    const body: Partial<IUserModel> = {
      name: name?.name,
      profilePic: profilePic?.url,
    };

    await UserModel.updateOne({ _id: userId.id }, { $set: body });
  }

  async save(user: User): Promise<void> {
    await UserModel.create({
      ...user.toPrimitives(),
      _id: user.id.id,
    });
  }

  async findUserByEmail(email: Email): Promise<Maybe<User>> {
    const userModel = await UserModel.findOne<IUserModel>({
      email: email.email,
      role: RoleType.USER,
    } as IUserModel);

    if (!userModel) return Maybe.nothing();

    return Maybe.some(this.toUser(userModel));
  }

  async findAdvertiserByEmail(email: Email): Promise<Maybe<User>> {
    const userModel = await UserModel.findOne<IUserModel>({
      email: email.email,
      role: RoleType.BUSINESS,
    } as IUserModel);
    debugger;
    if (!userModel) return Maybe.nothing();
    return Maybe.some(this.toUser(userModel));
  }

  async findUserByName(name: Name): Promise<Maybe<User>> {
    const userModel = await UserModel.findOne<IUserModel>({
      name: name.name,
      role: RoleType.USER,
    } as IUserModel);

    if (!userModel) return Maybe.nothing();
    return Maybe.some(this.toUser(userModel));
  }

  async findAdvertiserByName(name: Name): Promise<Maybe<User>> {
    const userModel = await UserModel.findOne<IUserModel>({
      name: name.name,
      role: RoleType.BUSINESS,
    } as IUserModel);

    if (!userModel) return Maybe.nothing();
    return Maybe.some(this.toUser(userModel));
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
