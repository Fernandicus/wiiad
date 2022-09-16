import { ErrorCreatingAd } from "../ErrorCreatingAd";

export default class AdvertiserId {
  public readonly id;

  constructor(id: string) {
    if (id == null) {
      throw new ErrorCreatingAd("AdvertiserId is mandatory");
    }
    this.id = id;
  }
}