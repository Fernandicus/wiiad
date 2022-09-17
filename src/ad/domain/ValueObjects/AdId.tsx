import { AdConstants } from "../../ad-constants";
import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdId {
  readonly id;
  constructor(id: string) {
    if (id == null || id.length == 0) {
      throw new ErrorCreatingAd("Ad id is mandatory");
    }

    this.id = id;
  }
}
