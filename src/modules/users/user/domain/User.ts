import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";

export interface IUserProps {
  id: UniqId;
  name: Name;
  email: Email;
  role: Role;
  profilePic: ProfilePic;
}

export interface IUserPrimitives {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

export class User {
  readonly id;
  readonly name;
  readonly email;
  readonly role;
  readonly profilePic;

  constructor(props: IUserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.profilePic = props.profilePic;
  }

  toPrimitives(): IUserPrimitives {
    return {
      id: this.id.id,
      email: this.email.email,
      name: this.name.name,
      role: this.role.role,
      profilePic: this.profilePic.url,
    };
  }
}
