import { RoleType } from "../../../domain/Role";
import {
  GenericUser,
  IGenericUserProps,
  IGenericUserPrimitives,
} from "@/src/domain/IGenericUser";
import { ErrorCreatingAdvertiser } from "./ErrorCreatingAdvertiser";
import { ProfilePic } from "@/src/domain/ProfilePic";

export interface AdvertiserPropsPrimitives extends IGenericUserPrimitives {}

export class Advertiser implements GenericUser {
  readonly id;
  readonly name;
  readonly email;
  readonly role;
  readonly profilePic;

  constructor(props: IGenericUserProps) {
    if (props.role.role === RoleType.USER)
      throw new ErrorCreatingAdvertiser("Advertiser Role is not valid");
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.profilePic = props.profilePic;
  }

  toPrimitives(): AdvertiserPropsPrimitives {
    return {
      id: this.id.id,
      name: this.name.name,
      email: this.email.email,
      role: this.role.role,
      profilePic: this.profilePic.url,
    };
  }
}
