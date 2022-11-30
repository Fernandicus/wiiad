import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { FindAdvertiser } from "../use-case/FindAdvertiser";

export class FindAdvertiserHandler {
  constructor(private findAdvertiser: FindAdvertiser) {}

  async findByEmail(email: string): Promise<AdvertiserPropsPrimitives> {
    const mail = new Email(email);
    const advertiserFound = await this.findAdvertiser.byEmail(mail);
    return advertiserFound.toPrimitives();
  }

  async findByUserName(
    name: string
  ): Promise<AdvertiserPropsPrimitives> {
    const userName = new Name(name);
    const advertiserFound = await this.findAdvertiser.byUserName(userName);
    return advertiserFound.toPrimitives();
  }
}
