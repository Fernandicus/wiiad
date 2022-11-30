import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";

export class FindAdvertiser {
  constructor(private userRepo: IUserRepo) {}

  async byEmail(email: Email): Promise<User> {
    const userFound = await this.userRepo.findAdvertiserByEmail(email);
    if (!userFound)
      throw new ErrorFindingUser(`User email ${email.email} do not exist`);
    return userFound;
  }

  async byName(userName: Name): Promise<User> {
    const userFound = await this.userRepo.findAdvertiserByName(userName);
    if (!userFound)
      throw new ErrorFindingUser(`User name ${userName.name} do not exist`);
    return userFound;
  }
}
