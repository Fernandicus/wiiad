import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { IUpdateProfileProps } from "../use-case/UpdateUser";
import { User } from "./User";

export interface IUserRepo {
  save(user: User): Promise<void>;
  findUserByEmail(email: Email): Promise<User | null>;
  findAdvertiserByEmail(email: Email): Promise<User | null>;
  findUserByName(name: Name): Promise<User | null>;
  findAdvertiserByName(name: Name): Promise<User | null>;
  update(params: IUpdateProfileProps): Promise<void>;
}
