import { UniqId } from "../utils/UniqId";
import { Email } from "./Email";
import { Name } from "./Name";
import { Role } from "./Role";

export abstract class GenericUser {
  readonly id: UniqId;
  readonly name: Name;
  readonly email: Email;
  readonly role: Role;

  constructor(params: IGenericUserProps) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
  }
}

export interface IGenericUserProps {
  id: UniqId;
  name: Name;
  email: Email;
  role: Role;
}

export interface IGenericUserPrimitives {
  id: string;
  name: string;
  email: string;
  role: string;
}
