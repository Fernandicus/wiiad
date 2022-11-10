import { UniqId } from "@/src/utils/UniqId";
import { Ad } from "../domain/Ad";
import { IAdRepository } from "../domain/IAdRepository";
import { ErrorFindingAd } from "../domain/ErrorFindingAd";

export class FindAds {
  constructor(private repository: IAdRepository) {}

  async findAllByAdvertiserId(id: UniqId): Promise<Ad[]> {
    const adsFound = await this.repository.findAllByAdvertiserId(id);
    if(!adsFound) throw new ErrorFindingAd(`No ads found for the given advertiser id`)
    return adsFound;
  }

  async findByAdId(id: UniqId): Promise<Ad> {
    const adFound = await this.repository.findByAdId(id);
    if(!adFound) throw new ErrorFindingAd(`No ad found for the given id`)
    return adFound;
  }
}
