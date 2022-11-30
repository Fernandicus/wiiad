import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";

export class FindUser {
  constructor(private userRepo: IUserRepo) {}

  async findByEmail(email: Email): Promise<User> {
    const userFound = await this.userRepo.findByEmail(email);
    if (!userFound)
      throw new ErrorFindingUser(`User email ${email.email} do not exist`);
    return userFound;
  }

  async findUserName(userName: Name): Promise<User> {
    const userFound = await this.userRepo.findByUserName(userName);
    if (!userFound)
      throw new ErrorFindingUser(`User name ${userName.name} do not exist`);
    return userFound;
  }
}
