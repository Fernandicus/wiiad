import { HydratedDocument } from "mongoose";
import { IUserRepo } from "../domain/IUserRepo";
import { IUserPrimitives } from "../domain/User";
import { UserModel, UserModelProps } from "./UserMode";

export class UserMongoDBRepo implements IUserRepo {
  async save(user: IUserPrimitives): Promise<void> {
    const userModel: HydratedDocument<UserModelProps> =
      new UserModel<UserModelProps>({
        ...user,
        _id: user.id,
      });
    await userModel.save();
  }

  async findByEmail(email: string): Promise<IUserPrimitives | null> {
    const userModel = await UserModel.findOne<UserModelProps>({
      email,
    });

    if (!userModel) return null;

    return {
      id: userModel._id,
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      bankAccount: userModel.bankAccount,
    };
  }

  async findByUserName(name: string): Promise<IUserPrimitives | null> {
    const userModel = await UserModel.findOne<UserModelProps>({
      name,
    });

    if (!userModel) return null;

    return {
      id: userModel._id,
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      bankAccount: userModel.bankAccount,
    };
  }
}
