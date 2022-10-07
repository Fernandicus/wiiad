import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AdvertiserId } from "./value-objects/AdvertiserId";
import { Rol, RolType } from "../../domain/Rol";

export interface AdvertiserProps {
  id: AdvertiserId;
  name: Name;
  email: Email;
  rol: Rol;
}

export interface AdvertiserPropsPrimitives {
  id: string;
  name: string;
  email: string;
  rol: RolType;
}

export class Advertiser {
  readonly id;
  readonly name;
  readonly email;
  readonly rol;

  constructor({ id, name, email, rol }: AdvertiserProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.rol = rol;
  }

  toPrimitives(): AdvertiserPropsPrimitives {
    return {
      id: this.id.id,
      name: this.name.name,
      email: this.email.email,
      rol: this.rol.rol,
    };
  }
}
