import { Ad } from "../domain/Ad";
import { AdRepository } from "../domain/AdRepository";

export class CreateAd {
  constructor(private repository: AdRepository) {}

  async save(ad: Ad): Promise<void> {
    await this.repository.save(ad.toPrimitives());
  }
}
