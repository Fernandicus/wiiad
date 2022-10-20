import { UniqId } from "@/src/utils/UniqId";
import { AdPropsPrimitives } from "../domain/Ad";
import { FindAds } from "../use-case/FindAds";

export class AdFinderHandler {
  constructor(private findAds: FindAds) {}

  async findAll(advertiserId: string): Promise<AdPropsPrimitives[]> {
    const id = new UniqId(advertiserId);
    const adsFound = await this.findAds.findAllByAdvertiserId(id);
    return adsFound;
  }
}
