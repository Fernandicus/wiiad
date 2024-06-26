import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/common/domain/UniqId";
import { IUserPrimitives, User } from "../domain/User";
import { FindUser } from "../use-case/FindUser";

export class FindUserHandler {
  constructor(private findUser: FindUser) {}

  async byEmail(email: string): Promise<Maybe<IUserPrimitives>> {
    const userFound = await this.findUser.byEmail(new Email(email));
    return this.match(userFound);
  }

  async byName(name: string): Promise<Maybe<IUserPrimitives>> {
    const userFound = await this.findUser.byName(new Name(name));
    return this.match(userFound);
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
