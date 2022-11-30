import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { IUserPrimitives } from "../domain/User";
import { FindAdvertiser } from "../use-case/FindAdvertiser";

export class FindAdvertiserHandler {
  constructor(private findAdvertiser: FindAdvertiser) {}

  async byEmail(email: string): Promise<IUserPrimitives> {
    const userFound = await this.findAdvertiser.byEmail(new Email(email));
    return userFound.toPrimitives();
  }

  async byName(name: string): Promise<IUserPrimitives> {
    const userFound = await this.findAdvertiser.byName(new Name(name));
    return userFound.toPrimitives();
  }
}
