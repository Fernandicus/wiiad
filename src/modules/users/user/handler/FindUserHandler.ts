import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives, User } from "../domain/User";
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

  async byId(id:string): Promise<Maybe<IUserPrimitives>> {
    const userFound = await this.findUser.byId(new UniqId(id));
    return this.match(userFound);
  }

  private match(userFound: Maybe<User>) {
    return userFound.match({
      nothing: () => {
        return Maybe.nothing<IUserPrimitives>();
      },
      some: (advertiser) => {
        return Maybe.some(advertiser.toPrimitives());
      },
    });
  }
}
