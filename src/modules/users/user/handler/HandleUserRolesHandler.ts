import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { IUserPrimitives, User } from "../domain/User";
import {
  ForUserRoles,
  HandleUserRoles,
  IsUserRole,
} from "../use-case/HandleUserRoles";

export class HandleUserRolesHandler implements HandleUserRoles {
  private handleUser;
  readonly user;
  readonly role;

  constructor(user: IUserPrimitives) {
    this.user = this.toUser(user);
    this.role = this.user.role;
    this.handleUser = new HandleUserRoles(this.user);
  }

  isRole<T, U>(role: keyof typeof RoleType, fns: IsUserRole<T, U>): T | U {
    return this.handleUser.isRole(role, fns);
  }

  forRole<T>(fns: ForUserRoles<T>): T {
    return this.handleUser.forRole({
      BUSINESS: fns.BUSINESS,
      USER: fns.USER,
      AGENCY: fns.AGENCY,
    });
  }

  private toUser(data: IUserPrimitives): User {
    return new User({
      id: new UniqId(data.id),
      email: new Email(data.email),
      name: new Name(data.name),
      profilePic: new ProfilePic(data.profilePic),
      role: new Role(data.role),
    });
  }
}
