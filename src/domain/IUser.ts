import { UniqId } from "../utils/UniqId";
import { Email } from "./Email";
import { Name } from "./Name";
import { Rol } from "./Rol";

export abstract class GenericUser {
  readonly id: UniqId;
  readonly name: Name;
  readonly email: Email;
  readonly rol: Rol;

  constructor(params: IGenericUserProps) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.rol = params.rol;
  }
}

export interface IGenericUserProps {
  id: UniqId;
  name: Name;
  email: Email;
  rol: Rol;
}

export interface IGenericUserPrimitives {
  id: string;
  name: string;
  email: string;
  rol: string;
}
