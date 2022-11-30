import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { Advertiser } from "../domain/Advertiser";
import { IAdvertiserRepo } from "../domain/IAdvertiserRepo";
import { ErrorFindingAdvertiser } from "../domain/ErrorFindingAdvertiser";

export class FindAdvertiser {
  constructor(private repository: IAdvertiserRepo) {}

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
