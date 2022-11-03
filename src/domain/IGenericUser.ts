import { UniqId } from "../utils/UniqId";
import { Email } from "./Email";
import { Name } from "./Name";
import { ProfilePic } from "./ProfilePic";
import { Role } from "./Role";

export abstract class GenericUser {
  readonly id: UniqId;
  readonly name: Name;
  readonly email: Email;
  readonly role: Role;
  readonly profilePic: ProfilePic;

  constructor(params: IGenericUserProps) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
    this.profilePic = params.profilePic;
  }
}

export interface IGenericUserProps {
  id: UniqId;
  name: Name;
  email: Email;
  role: Role;
  profilePic: ProfilePic;
}

export interface IGenericUserPrimitives {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}
