import { GenericUser, IGenericUserPrimitives, IGenericUserProps } from "@/src/domain/IUser";
import { RolType } from "@/src/domain/Rol";
import { BancAccount } from "./BankAccount";
import { ErrorCreatingUser } from "./ErrorCreatingUser";

export interface IUserPrimitives extends IGenericUserPrimitives {
  bancAccount?: string;
}

export interface IUserProps extends IGenericUserProps {
  bancAccount?: BancAccount;
}

export class User implements GenericUser{
  readonly id;
  readonly bancAccount;
  readonly name;
  readonly email;
  readonly rol;

  constructor(props: IUserProps) {
    if (props.rol.rol !== RolType.USER)
      throw new ErrorCreatingUser("User Rol is not valid");
      
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.rol = props.rol;
    this.bancAccount = props.bancAccount;
  }
}
