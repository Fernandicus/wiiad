import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol, RolType } from "@/src/domain/Rol";
import { BankAccount } from "@/src/modules/user/domain/BankAccount";
import {
  IUserPrimitives,
  IUserProps,
  User,
} from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

export class FakeUser extends User {
  constructor(params: IUserProps) {
    super(params);
  }

  static create(id: UniqId): User {
    const userPrimitives = this.generateRandom(id.id);
    return new User({
      id,
      email: new Email(userPrimitives.email),
      name: new Name(userPrimitives.name),
      rol: new Rol(userPrimitives.rol),
      bankAccount: new BankAccount(userPrimitives.bankAccount!),
    });
  }

  static createWithPrimitives(id: string): IUserPrimitives {
    const userPrimitives = this.generateRandom(id);
    return userPrimitives;
  }

  static createManyWithPrimitives(amount: number): IUserPrimitives[] {
    let userPrimitives: IUserPrimitives[] = [];

    for (let i = 1; i < amount; i++) {
      userPrimitives.push(this.generateRandom(UniqId.generate()));
    }

    return userPrimitives;
  }

  private static generateRandom(id: string): IUserPrimitives {
    return {
      id,
      email: faker.internet.email(),
      name: faker.name.firstName(),
      rol: RolType.USER,
      bankAccount: `ES${Math.floor(Math.random() * 1000000)}`,
    };
  }
}
