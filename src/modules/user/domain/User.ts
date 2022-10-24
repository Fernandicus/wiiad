import { GenericUser, IGenericUserPrimitives, IGenericUserProps } from "@/src/domain/IUser";
import { RolType } from "@/src/domain/Rol";
import { BankAccount } from "./BankAccount";
import { ErrorCreatingUser } from "./ErrorCreatingUser";

export interface IUserPrimitives extends IGenericUserPrimitives {
  bankAccount?: string;
}

export interface IUserProps extends IGenericUserProps {
  bankAccount?: BankAccount;
}

export class User implements GenericUser{
  readonly id;
  readonly bankAccount;
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
    this.bankAccount = props.bankAccount;
  }

  toPrimitives():IUserPrimitives{
    return {
      id: this.id.id,
      email: this.email.email,
      name: this.name.name,
      rol: this.rol.rol,
      bankAccount: this.bankAccount?.number,
    }
  }
}
