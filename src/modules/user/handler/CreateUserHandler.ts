import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol } from "@/src/domain/Rol";
import { UniqId } from "@/src/utils/UniqId";
import { BankAccount } from "../domain/BankAccount";
import { IUserPrimitives, User } from "../domain/User";
import { CreateUser } from "../use-case/CreateUser";

export class CreateUserHandler {
  constructor(private createUser: CreateUser) {}

  async create(user: IUserPrimitives): Promise<void> {
    const newUser = new User({
      id: new UniqId(user.id),
      name: new Name(user.name),
      email: new Email(user.email),
      rol: new Rol(user.rol),
      bankAccount: user.bankAccount
        ? new BankAccount(user.bankAccount)
        : undefined,
    });
    await this.createUser.create(newUser);
  }
}