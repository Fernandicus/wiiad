import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { User } from "./User";

export interface IUserRepo {
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | null>;
  findByUserName(name: Name): Promise<User | null>;
}
