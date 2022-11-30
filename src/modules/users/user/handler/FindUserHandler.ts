import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { IUserPrimitives } from "../domain/User";
import { FindUser } from "../use-case/FindUser";

export class FindUserHandler {
  constructor(private findUser: FindUser) {}

  async byEmail(email: string): Promise<IUserPrimitives> {
    const userFound = await this.findUser.byEmail(new Email(email));
    return userFound.toPrimitives();
  }

  async byName(name: string): Promise<IUserPrimitives> {
    const userFound = await this.findUser.byName(new Name(name));
    return userFound.toPrimitives();
  }
}
