import { Advertiser } from "../domain/Advertiser";
import { IAdvertiserRepo } from "../domain/IAdvertiserRepo";

export class CreateAdvertiser {
  constructor(private repository: IAdvertiserRepo) {}

  async create(advertiser: Advertiser): Promise<void> {
    this.repository.save(advertiser)
  }
}
