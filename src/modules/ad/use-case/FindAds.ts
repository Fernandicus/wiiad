import { UniqId } from "@/src/common/domain/UniqId";
import { Ad } from "../domain/Ad";
import { IAdRepository } from "../domain/interfaces/IAdRepository";
import { ErrorFindingAd } from "../domain/errors/ErrorFindingAd";

export class FindAds {
  constructor(private repository: IAdRepository) {}

  async findAllByAdvertiserId(id: UniqId): Promise<Ad[]> {
    const adsFound = await this.repository.findAllByAdvertiserId(id);
    if (!adsFound) throw ErrorFindingAd.byAdvertiserId(id.id);
    return adsFound;
  }

  async findByAdId(id: UniqId): Promise<Ad> {
    const adFound = await this.repository.findByAdId(id);
    if (!adFound) throw ErrorFindingAd.byAdId(id.id);
    return adFound;
  }
}
