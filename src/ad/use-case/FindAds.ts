import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";
import { AdvertiserId } from "../domain/ValueObjects/AdvertiserId";

export class FindAds {
  constructor(private repository: AdRepository) {}

  async findAllByAdvertiserId(id: AdvertiserId): Promise<AdPropsPrimitives[]> {
    const adsFound = await this.repository.findAllByAdvertiserId(id.id);
    return adsFound;
  }
}
