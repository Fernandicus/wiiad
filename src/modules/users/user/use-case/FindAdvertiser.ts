import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";

export class FindAdvertiser {
  constructor(private userRepo: IUserRepo) {}

  async byEmail(email: Email): Promise<Maybe<User>> {
    return await this.userRepo.findAdvertiserByEmail(email);
  }

  async byName(userName: Name): Promise<Maybe<User>> {
    return await this.userRepo.findAdvertiserByName(userName);
  }

  async byId(id: UniqId): Promise<Maybe<User>> {
    return await this.userRepo.findAdvertiserById(id);
  }
}
