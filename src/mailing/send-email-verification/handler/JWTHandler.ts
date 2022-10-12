import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol } from "@/src/domain/Rol";
import { ManageJWT } from "../use-case/ManageJWT";

export class JWTHandler {
  constructor(private manageJWT: ManageJWT) {}

  advertiserToken(advertiser: AdvertiserPropsPrimitives): string {
    const payload = new Advertiser({
      id: new AdvertiserId(advertiser.id),
      email: new Email(advertiser.email),
      rol: new Rol(advertiser.rol),
      name: new Name(advertiser.name),
    });
    return this.manageJWT.createAdvertiserToken(payload);
  }

  decodeToken<T extends object>(token: string): T {
    return this.manageJWT.decodeToken<T>(token);
  }
}
