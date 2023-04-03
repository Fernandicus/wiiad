import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/common/domain/UniqId";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";

export class FindUser {
  constructor(private userRepo: IUserRepo) {}

  async byEmail(email: Email): Promise<Maybe<User>> {
    return await this.userRepo.findUserByEmail(email);
  }

  async byName(userName: Name): Promise<Maybe<User>> {
    return await this.userRepo.findUserByName(userName);
   
  }

  async byId(id: UniqId): Promise<Maybe<User>> {
    return await this.userRepo.findUserById(id);
  }
}
