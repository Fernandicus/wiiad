import { RolType } from "../../../domain/Rol";
import { GenericUser, IGenericUserProps, IGenericUserPrimitives } from "@/src/domain/IUser";
import { ErrorCreatingAdvertiser } from "./ErrorCreatingAdvertiser";

export interface AdvertiserPropsPrimitives extends IGenericUserPrimitives {}

export class Advertiser implements GenericUser{
  readonly id;
  readonly name;
  readonly email;
  readonly rol;

  constructor(props: IGenericUserProps) {
    if (props.rol.rol === RolType.USER)
      throw new ErrorCreatingAdvertiser("Advertiser Rol is not valid");
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.rol = props.rol;
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
