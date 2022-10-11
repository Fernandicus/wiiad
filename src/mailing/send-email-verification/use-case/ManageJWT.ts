import {
  Advertiser,
  AdvertiserProps,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { IJsonWebTokenRepo } from "../domain/IJsonWebTokenRepo";

export class ManageJWT {
  constructor(private jwtrepo: IJsonWebTokenRepo) {}

  createAdvertiserToken(payload: Advertiser): string {
    const adv: AdvertiserPropsPrimitives = {
      email: payload.email.email,
      id: payload.id.id,
      name: payload.name.name,
      rol: payload.rol.rol,
    };
    return this.jwtrepo.create<AdvertiserPropsPrimitives>(adv);
  }

  decodeToken<T extends object>(token: string):T {
    return this.jwtrepo.decode(token);
  }
}
