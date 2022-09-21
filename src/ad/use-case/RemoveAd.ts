import { AdRepository } from "../domain/AdRepository";
import { AdId } from "../domain/value-objects/AdId";

export class RemoveAd {
  constructor(private repository: AdRepository) {}

  async byId(id: AdId): Promise<void> {
    await this.repository.remove(id.id);
  }
}
