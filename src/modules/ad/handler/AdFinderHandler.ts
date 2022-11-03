import { UniqId } from "@/src/utils/UniqId";
import { AdPropsPrimitives } from "../domain/Ad";
import { ErrorFindingAd } from "../domain/ErrorFindingAd";
import { FindAds } from "../use-case/FindAds";

export class AdFinderHandler {
  constructor(private findAds: FindAds) {}

  async findAll(advertiserId: string): Promise<AdPropsPrimitives[]> {
    const id = new UniqId(advertiserId);
    const adsFound = await this.findAds.findAllByAdvertiserId(id);
    return adsFound.map((ad): AdPropsPrimitives => {
      return ad.toPrimitives();
    });
  }

  async findByAdId(adId: string): Promise<AdPropsPrimitives> {
    const id = new UniqId(adId);
    const adsFound = await this.findAds.findByAdId(id);
    if (!adsFound) throw new ErrorFindingAd("No ad found");
    return adsFound.toPrimitives();
  }
}
