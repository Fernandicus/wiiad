import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";

export class FindAdvertiser {
  constructor(private repository: AdvertiserRepo) {}

  async byEmail(email: Email): Promise<AdvertiserPropsPrimitives | null> {
    const advertiser = await this.repository.findByEmail(email.email);
    return advertiser;
  }

  async byUserName(name: Name): Promise<AdvertiserPropsPrimitives | null> {
    const advertiser = await this.repository.findByName(name.name)
    return advertiser;
  }
}
