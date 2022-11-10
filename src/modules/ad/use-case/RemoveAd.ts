import { UniqId } from "@/src/utils/UniqId";
import { IAdRepository } from "../domain/IAdRepository";

export class RemoveAd {
  constructor(private repository: IAdRepository) {}

  async byId(id: UniqId): Promise<void> {
    await this.repository.remove(id);
  }
}
