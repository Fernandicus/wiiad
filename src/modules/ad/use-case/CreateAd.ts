import { Ad } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";

export class CreateAd {
  constructor(private adRepository: AdRepository) {}

  async save(ad: Ad): Promise<void> {
    await this.adRepository.save(ad.toPrimitives());
  }
}
