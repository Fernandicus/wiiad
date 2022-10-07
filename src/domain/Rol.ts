export enum RolType {
  AGENCY = "agency",
  BUSINESS = "business",
  USER = "user",
}

export class Rol {
  readonly rol;

  constructor(rolType: RolType | string) {
    const rolTypes = Object.values(RolType);
    const rolFound = rolTypes.find((rol) => rol == rolType);

    if (!rolFound) throw new Error(`Rol do not exist: ${rolType}`);
    this.rol = rolType;
  }
}
