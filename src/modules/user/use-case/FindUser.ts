import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol } from "@/src/domain/Rol";
import { UniqId } from "@/src/utils/UniqId";
import { BankAccount } from "../domain/BankAccount";
import { IUserRepo } from "../domain/IUserRepo";
import { IUserPrimitives, User } from "../domain/User";

export class FindUser {
  constructor(private userRepo: IUserRepo) {}

  async findByEmail(email: Email): Promise<User | null> {
    const userFound = await this.userRepo.findByEmail(email.email);
    if (!userFound) return null;
    return new User({
      email: new Email(userFound.email),
      id: new UniqId(userFound.id),
      name: new Name(userFound.name),
      rol: new Rol(userFound.rol),
      bankAccount: userFound.bankAccount
        ? new BankAccount(userFound.bankAccount!)
        : undefined,
    });
  }
}
