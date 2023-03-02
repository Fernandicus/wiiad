import { Role, RoleType } from "@/src/common/domain/Role";
import { assertUnreachable } from "@/src/utils/helpers";
import { User } from "../domain/User";
import { HandleRoles } from "./HandleRoles";

export type ForUserRoles<T> = {
  [K in keyof typeof RoleType]: (user: User) => T;
};

export type IsUserRole<T, U> = { then: (user: User) => T; else: (user: User) => U };

export class HandleUserRoles implements HandleRoles {
  readonly role;

  constructor(readonly user: User) {
    this.role = user.role;
  }

  isRole<T, U>(role: keyof typeof RoleType, fns: IsUserRole<T, U>): T | U {
    if (this.user.role.role === role) return fns.then(this.user);
    return fns.else(this.user);
  }

  forRole<T>(fns: ForUserRoles<T>): T {
    const role = this.user.role.role as RoleType;

    switch (role) {
      case RoleType.AGENCY:
        return fns.AGENCY(this.user);

      case RoleType.BUSINESS:
        return fns.BUSINESS(this.user);

      case RoleType.USER:
        return fns.USER(this.user);

      default:
        throw assertUnreachable(role);
    }
  }
}