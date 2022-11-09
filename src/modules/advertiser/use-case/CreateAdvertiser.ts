import { Advertiser } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";

export class CreateAdvertiser {
  constructor(private repository: AdvertiserRepo) {}

  async create(advertiser: Advertiser): Promise<void> {
    this.repository.save(advertiser)
  }
}
