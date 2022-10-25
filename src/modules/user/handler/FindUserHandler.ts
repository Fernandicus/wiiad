import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ErrorFindingUser } from "../domain/ErrorFindingUser";
import { IUserPrimitives } from "../domain/User";
import { FindUser } from "../use-case/FindUser";

export class FindUserHandler {
  constructor(private findUser: FindUser) {}

  async findByEmail(email: string): Promise<IUserPrimitives | null> {
    const userFound = await this.findUser.findByEmail(new Email(email));
    if (!userFound) return null;
    return userFound.toPrimitives();
  }

  async findByUserName(name: string): Promise<IUserPrimitives | null> {
    const userFound = await this.findUser.findUserName(new Name(name));
    if (!userFound) return null;
    return userFound.toPrimitives();
  }
}
