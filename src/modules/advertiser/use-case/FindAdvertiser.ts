import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ProfilePic } from "@/src/domain/ProfilePic";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { Advertiser, AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";
import { ErrorFindingAdvertiser } from "../domain/ErrorFindingAdvertiser";

export class FindAdvertiser {
  constructor(private repository: AdvertiserRepo) {}

  async byEmail(email: Email): Promise<Advertiser> {
    const advertiser = await this.repository.findByEmail(email);
    if (!advertiser)
      throw new ErrorFindingAdvertiser(
        `The advertiser email '${email.email}' doesn't exist`
      );
    return advertiser;
  }

  async byUserName(name: Name): Promise<Advertiser> {
    const advertiser = await this.repository.findByName(name);
    if (!advertiser)
      throw new ErrorFindingAdvertiser(
        `The advertiser name '${name.name}' doesn't exist`
      );
    return advertiser;
  }
}
