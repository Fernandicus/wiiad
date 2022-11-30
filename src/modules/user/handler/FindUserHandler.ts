import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserPrimitives } from "../domain/User";
import { FindUser } from "../use-case/FindUser";

export class FindUserHandler {
  constructor(private findUser: FindUser) {}

  async findByEmail(email: string): Promise<IUserPrimitives> {
    const userFound = await this.findUser.findByEmail(new Email(email));
    return userFound.toPrimitives();
  }

  async findByUserName(name: string): Promise<IUserPrimitives> {
    const userFound = await this.findUser.findUserName(new Name(name));
    return userFound.toPrimitives();
  }
}
