import { Role, RoleType } from "@/src/common/domain/Role";
import { assertUnreachable } from "@/src/utils/helpers";
import { IUserPrimitives } from "../domain/User";
import { ForRoles, HandleRoles, IsRole } from "../use-case/HandleRoles";
import { HandleUserRolesHandler } from "./HandleUserRolesHandler";

export class HandleRolesHandler implements HandleRoles{
  readonly role;

  constructor(role: string) {
    this.role = new Role(role);
  }

  static givenUser(user: IUserPrimitives): HandleUserRolesHandler {
    return new HandleUserRolesHandler(user);
  }

  isRole<T, U>(role: keyof typeof RoleType, fns: IsRole<T, U>): T | U {
    if (this.role.role === role) return fns.then();
    return fns.else();
  }

  forRole<T>(fns: ForRoles<T>): T {
    const role = this.role.role as RoleType;

    switch (role) {
      case RoleType.AGENCY:
        return fns.AGENCY();

      case RoleType.BUSINESS:
        return fns.BUSINESS();

      case RoleType.USER:
        return fns.USER();

      default:
        throw assertUnreachable(role);
    }
  }
}
