import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { Advertiser, AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { Role } from "../../../common/domain/Role";
import { CreateAdvertiser } from "../use-case/CreateAdvertiser";
import { UniqId } from "@/src/utils/UniqId";
import { ProfilePic } from "@/src/common/domain/ProfilePic";

export class AdvertiserCreatorHandler {
  constructor(private createAdvertiser: CreateAdvertiser) {}

  async create(advertiserProps: AdvertiserPropsPrimitives): Promise<void> {
    const advertiser = new Advertiser({
      id: new UniqId(advertiserProps.id),
      email: new Email(advertiserProps.email),
      name: new Name(advertiserProps.name),
      role: new Role(advertiserProps.role),
      profilePic: new ProfilePic(advertiserProps.profilePic)
    });
    await this.createAdvertiser.create(advertiser);
  }
}
