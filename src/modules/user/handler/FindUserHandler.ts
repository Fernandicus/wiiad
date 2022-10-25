import { Email } from "@/src/domain/Email";
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
}
