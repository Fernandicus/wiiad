import { Email } from "@/src/domain/Email";
import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { FindAdvertiser } from "../use-case/FindAdvertiser";

export class FindAdvertiserHandler {
  constructor(private findAdvertiser: FindAdvertiser) {}

  async findById(email: string): Promise<AdvertiserPropsPrimitives | null> {
    const mail = new Email(email);
    const advertiserFound = await this.findAdvertiser.byEmail(mail);
    return advertiserFound;
  }
}
