import { ErrorCreatingAdvertiser } from "../ErrorCreatingAdvertiser";

export enum AdvertiserRolType {
  AGENCY = "agency",
  BUSINESS = "business",
}

export class AdvertiserRol {
  readonly rol;
  constructor(rolType: string) {
    switch (rolType) {
      case AdvertiserRolType.AGENCY:
        this.rol = AdvertiserRolType.AGENCY;
        break;
      case AdvertiserRolType.BUSINESS:
        this.rol = AdvertiserRolType.BUSINESS;
        break;
      default:
        throw new ErrorCreatingAdvertiser("AdvertiserRol do not exist");
    }
  }
}
