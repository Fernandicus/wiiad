import { ErrorCreatingAdvertiser } from "../ErrorCreatingAdvertiser";

export class AdvertiserId {
  readonly id;
  constructor(id: string) {
    if (id == "")
      throw new ErrorCreatingAdvertiser("Advertiser Id cant be empty");
    this.id = id;
  }
}
