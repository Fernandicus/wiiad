import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol, RolType } from "../../../domain/Rol";
import { IUser } from "@/src/domain/IUser";
import { UniqId } from "@/src/utils/UniqId";

export interface AdvertiserProps {
  id: UniqId;
  name: Name;
  email: Email;
  rol: Rol;
}

export interface AdvertiserPropsPrimitives extends IUser {}

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
