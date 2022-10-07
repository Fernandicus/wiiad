export enum RolType {
  AGENCY = "agency",
  BUSINESS = "business",
  USER = "user",
}

export class Rol {
  readonly rol;

  constructor(rolType: RolType) {
    const rolTypes = Object.values(RolType);
    const rolFound = rolTypes.find((rol) => rol == rolType);

    if (!rolFound) throw new Error("Rol do not exist");
    this.rol = rolType;
  }
}
