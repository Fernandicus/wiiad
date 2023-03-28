import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/common/domain/UniqId";
import { IUpdateUserProfileProps } from "../use-case/UpdateUser";
import { User } from "./User";

export interface IUserRepo {
  save(user: User): Promise<void>;

  findUserByEmail(email: Email): Promise<Maybe<User>>;
  findUserByName(name: Name): Promise<Maybe<User>>;
  findUserById(id: UniqId): Promise<Maybe<User>>;

  updateProfile(params: IUpdateUserProfileProps): Promise<void>;
  updateEmail(params: { id: UniqId; newEmail: Email }): Promise<void>;

  findAdvertiserByEmail(email: Email): Promise<Maybe<User>>;
  findAdvertiserByName(name: Name): Promise<Maybe<User>>;
  findAdvertiserById(id: UniqId): Promise<Maybe<User>>;
}
