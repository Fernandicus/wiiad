import { Ad } from "../domain/Ad";
import { Repository } from "../domain/Repository";

export class CreateAd {
  constructor(private repository: Repository) {}

  async save(ad: Ad): Promise<void> {
    await this.repository.save(ad);
  }
}
