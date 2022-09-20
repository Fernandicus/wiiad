import { Repository } from "../domain/Repository";
import { AdId } from "../domain/ValueObjects/AdId";

export class RemoveAd {
  constructor(private repository: Repository) {}

  async byId(id: AdId): Promise<void> {
    await this.repository.remove(id.id);
  }
}
