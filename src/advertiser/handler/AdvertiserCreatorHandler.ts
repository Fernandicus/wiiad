import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Advertiser, AdvertiserPropsPrimitives } from "../domain/Advertiser";
import { AdvertiserId } from "../domain/value-objects/AdvertiserId";
import { AdvertiserRol } from "../domain/value-objects/AdvertiserRol";
import { CreateAdvertiser } from "../use-case/CreateAdvertiser";

export class AdvertiserCreatorHandler {
  constructor(private createAdvertiser: CreateAdvertiser) {}

  async create(advertiserProps: AdvertiserPropsPrimitives): Promise<void> {
    const advertiser = new Advertiser({
      id: new AdvertiserId(advertiserProps.id),
      email: new Email(advertiserProps.email),
      name: new Name(advertiserProps.name),
      rol: new AdvertiserRol(advertiserProps.rol),
    });
    await this.createAdvertiser.create(advertiser);
  }
}
