import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Advertiser, AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { Role } from "../../../domain/Role";
import { CreateAdvertiser } from "../use-case/CreateAdvertiser";
import { UniqId } from "@/src/utils/UniqId";

export class AdvertiserCreatorHandler {
  constructor(private createAdvertiser: CreateAdvertiser) {}

  async create(advertiserProps: AdvertiserPropsPrimitives): Promise<void> {
    const advertiser = new Advertiser({
      id: new UniqId(advertiserProps.id),
      email: new Email(advertiserProps.email),
      name: new Name(advertiserProps.name),
      role: new Role(advertiserProps.role),
    });
    await this.createAdvertiser.create(advertiser);
  }
}
