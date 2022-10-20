import { UniqId } from "@/src/utils/UniqId";
import { AdRepository } from "../domain/AdRepository";

export class RemoveAd {
  constructor(private repository: AdRepository) {}

  async byId(id: UniqId): Promise<void> {
    await this.repository.remove(id.id);
  }
}
