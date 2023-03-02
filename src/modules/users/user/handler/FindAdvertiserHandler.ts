import { Email } from "@/src/common/domain/Email";
import { Maybe } from "@/src/common/domain/Maybe";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives, User } from "../domain/User";
import { FindAdvertiser } from "../use-case/FindAdvertiser";

export class FindAdvertiserHandler {
  constructor(private findAdvertiser: FindAdvertiser) {}

  async byEmail(email: string): Promise<Maybe<IUserPrimitives>> {
    const advertiserFound = await this.findAdvertiser.byEmail(new Email(email));
    return this.match(advertiserFound);
  }

  async byName(name: string): Promise<Maybe<IUserPrimitives>> {
    const advertiserFound = await this.findAdvertiser.byName(new Name(name));
    return this.match(advertiserFound);
  }

  async byId(id:string): Promise<Maybe<IUserPrimitives>> {
    const advertiserFound = await this.findAdvertiser.byId(new UniqId(id));
    return this.match(advertiserFound);
  }

  private match(advertiserFound: Maybe<User>) {
    return advertiserFound.match({
      nothing: () => {
        return Maybe.nothing<IUserPrimitives>();
      },
      some: (advertiser) => {
        return Maybe.some(advertiser.toPrimitives());
      },
    });
  }
}
