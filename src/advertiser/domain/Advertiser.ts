import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Password } from "@/src/domain/Password";
import { AdvertiserId } from "./value-objects/AdvertiserId";
import { AdvertiserRol } from "./value-objects/AdvertiserRol";

export interface AdvertiserProps {
  id: AdvertiserId;
  name: Name;
  email: Email;
  password: Password;
  rol: AdvertiserRol;
}

export interface AdvertiserPropsPrimitives {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: string;
}

export class Advertiser {
  readonly id;
  readonly name;
  readonly email;
  readonly password;
  readonly rol;

  constructor({ id, name, email, password, rol }: AdvertiserProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }

  toPrimitives(): AdvertiserPropsPrimitives {
    return {
      id: this.id.id,
      name: this.name.name,
      email: this.email.email,
      password: this.password.password,
      rol: this.rol.rol,
    };
  }
}
