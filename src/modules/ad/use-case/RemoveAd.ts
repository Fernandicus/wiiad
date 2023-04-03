import { UniqId } from "@/src/common/domain/UniqId";
import { IAdRepository } from "../domain/interfaces/IAdRepository";

export class RemoveAd {
  constructor(private repository: IAdRepository) {}

  async byId(id: UniqId): Promise<void> {
    await this.repository.remove(id);
  }
}
