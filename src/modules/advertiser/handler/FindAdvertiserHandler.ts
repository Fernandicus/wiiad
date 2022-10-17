import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { FindAdvertiser } from "../use-case/FindAdvertiser";

export class FindAdvertiserHandler {
  constructor(private findAdvertiser: FindAdvertiser) {}

  async findByEmail(email: string): Promise<AdvertiserPropsPrimitives | null> {
    const mail = new Email(email);
    const advertiserFound = await this.findAdvertiser.byEmail(mail);
    return advertiserFound;
  }

  async findByUserName(name:string): Promise<AdvertiserPropsPrimitives | null> {
    const userName = new Name(name);
    const advertiserFound = await this.findAdvertiser.byUserName(userName);
    return advertiserFound;
  }
}
