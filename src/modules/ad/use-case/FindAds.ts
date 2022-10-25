import { UniqId } from "@/src/utils/UniqId";
import { AdPropsPrimitives } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";

export class FindAds {
  constructor(private repository: AdRepository) {}

  async findAllByAdvertiserId(id: UniqId): Promise<AdPropsPrimitives[]> {
    const adsFound = await this.repository.findAllByAdvertiserId(id.id);
    return adsFound;
  }

  async findByAdId(id:UniqId): Promise<AdPropsPrimitives | null> {
    const adFound = await this.repository.findByAdId(id.id);
    return adFound;
  }
}
