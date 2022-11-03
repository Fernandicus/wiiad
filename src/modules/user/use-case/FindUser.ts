import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ProfilePic } from "@/src/domain/ProfilePic";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { BankAccount } from "../domain/BankAccount";
import { IUserRepo } from "../domain/IUserRepo";
import { IUserPrimitives, User } from "../domain/User";

export class FindUser {
  constructor(private userRepo: IUserRepo) {}

  async findByEmail(email: Email): Promise<User | null> {
    const userFound = await this.userRepo.findByEmail(email.email);
    if (!userFound) return null;
    return this.getUser(userFound);
  }

  async findUserName(userName: Name): Promise<User | null> {
    const userFound = await this.userRepo.findByUserName(userName.name);
    if (!userFound) return null;
    return this.getUser(userFound);
  }

  private getUser(user: IUserPrimitives): User {
    return new User({
      email: new Email(user.email),
      id: new UniqId(user.id),
      name: new Name(user.name),
      role: new Role(user.role),
      profilePic: new ProfilePic(user.profilePic),
      bankAccount: user.bankAccount
        ? new BankAccount(user.bankAccount!)
        : undefined,
    });
  }
}
