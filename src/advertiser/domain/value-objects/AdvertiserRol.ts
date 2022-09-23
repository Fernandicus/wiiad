export enum AdvertiserRolType {
    AGENCY = "agency",
    BUSINESS = "business"
}

export class AdvertiserRol{
    readonly rol;
    constructor(rolType: AdvertiserRolType){
        this.rol = rolType;
    }
}

