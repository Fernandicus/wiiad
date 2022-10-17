import { AdPropsPrimitives } from "../domain/Ad";
import { AdvertiserId } from "../../advertiser/domain/value-objects/AdvertiserId";
import { FindAds } from "../use-case/FindAds";

export class AdFinderHandler {
  constructor(private findAds: FindAds) {}

  async findAll(advertiserId: string): Promise<AdPropsPrimitives[]> {
    const id = new AdvertiserId(advertiserId);
    const adsFound = await this.findAds.findAllByAdvertiserId(id);
    return adsFound;
  }
}
