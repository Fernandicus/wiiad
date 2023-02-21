import { Role, RoleType } from "@/src/common/domain/Role";
import { assertUnreachable } from "@/src/utils/helpers";
import { User } from "../domain/User";
import { HandleUserRoles } from "./HandleUserRoles";

export type ForRoles<T> = {
  [K in keyof typeof RoleType]: () => T;
};

export type IsRole<T, U> = { then: () => T; else: () => U };

export class HandleRoles {
  constructor(readonly role: Role) {}

  static givenUser(user: User): HandleUserRoles {
    return new HandleUserRoles(user);
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
