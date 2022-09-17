import { AdConstants } from "../../ad-constants";
import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdId {
  

  readonly id;
  constructor(id: string) {
   

    if (id == null || id.length == 0) {
      throw new ErrorCreatingAd("Ad id is mandatory");
    }
    if (id.length != AdConstants.idLength) {
      throw new ErrorCreatingAd(`Ad id must be ${AdConstants.idLength} characters hex`);
    }
    if (!this.isHex(id)){
      console.log(id, this.isHex(id))
        throw new ErrorCreatingAd(`Ad id is not an hexadecimal character`);
    }
    this.id = id;
  }

  private isHex(id: string) {
    const regExp = /^[0-9a-fA-F]+$/;
    return regExp.test(id);
  }
}
