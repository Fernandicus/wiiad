export enum RoleType {
  AGENCY = "agency",
  BUSINESS = "business",
  USER = "user",
}

export class Role {
  readonly role;

  constructor(roleType: RoleType | string) {
    const roleTypes = Object.values(RoleType);
    const roleFound = roleTypes.find((role) => role == roleType);

    if (!roleFound) throw new Error(`Rol do not exist: ${roleType}`);
    this.role = roleType;
  }

}
