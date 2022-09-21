import { AdRepository } from "../domain/AdRepository";
import { AdId } from "../domain/ValueObjects/AdId";

export class RemoveAd {
  constructor(private repository: AdRepository) {}

  async byId(id: AdId): Promise<void> {
    await this.repository.remove(id.id);
  }
}
