import { UniqId } from "../utils/UniqId";
import { Email } from "./Email";
import { Name } from "./Name";
import { Rol } from "./Rol";

export interface IGenericUser {
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
