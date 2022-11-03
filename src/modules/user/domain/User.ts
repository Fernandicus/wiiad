import { GenericUser, IGenericUserPrimitives, IGenericUserProps } from "@/src/domain/IGenericUser";
import { RoleType } from "@/src/domain/Role";
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
  readonly role;

  constructor(props: IUserProps) {
    if (props.role.role !== RoleType.USER)
      throw new ErrorCreatingUser("User Role is not valid");
      
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.bankAccount = props.bankAccount;
  }

  toPrimitives():IUserPrimitives{
    return {
      id: this.id.id,
      email: this.email.email,
      name: this.name.name,
      role: this.role.role,
      bankAccount: this.bankAccount?.number,
    }
  }
}
