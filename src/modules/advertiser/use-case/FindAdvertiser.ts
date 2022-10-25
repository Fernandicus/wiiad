import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol } from "@/src/domain/Rol";
import { UniqId } from "@/src/utils/UniqId";
import { Advertiser } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";

export class FindAdvertiser {
  constructor(private repository: AdvertiserRepo) {}

  async byEmail(email: Email): Promise<Advertiser | null> {
    const advertiser = await this.repository.findByEmail(email.email);
    if (!advertiser) return null;
    return new Advertiser({
      email: new Email(advertiser.email),
      id: new UniqId(advertiser.id),
      name: new Name(advertiser.name),
      rol: new Rol(advertiser.rol),
    });
  }

  async byUserName(name: Name): Promise<Advertiser | null> {
    const advertiser = await this.repository.findByName(name.name);
    if (!advertiser) return null;
    return new Advertiser({
      email: new Email(advertiser.email),
      id: new UniqId(advertiser.id),
      name: new Name(advertiser.name),
      rol: new Rol(advertiser.rol),
    });
  }
}
