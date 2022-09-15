import { ErrorCreatingAd } from "../ErrorCreatingAd";

export default class AdvertiserId {
  public readonly id;

  constructor(id: number) {
    if (id == null) {
      throw new ErrorCreatingAd("AdvertiserId is mandatory");
    }
    this.id = id;
  }
}