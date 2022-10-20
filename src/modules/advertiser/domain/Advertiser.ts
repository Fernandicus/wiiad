import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Rol, RolType } from "../../../domain/Rol";
import { IGenericUser, IGenericUserPrimitives } from "@/src/domain/IUser";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorCreatingAdvertiser } from "./ErrorCreatingAdvertiser";

export interface AdvertiserProps extends IGenericUser {}

export interface AdvertiserPropsPrimitives extends IGenericUserPrimitives {}

export class Advertiser {
  readonly id;
  readonly name;
  readonly email;
  readonly rol;

  constructor({ id, name, email, rol }: AdvertiserProps) {
    if (rol.rol === RolType.USER)
      throw new ErrorCreatingAdvertiser("Rol cant be user");
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
