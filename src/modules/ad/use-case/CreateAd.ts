import { Ad } from "../domain/Ad";
import { IAdRepository } from "../domain/interfaces/IAdRepository";

export class CreateAd {
  constructor(private adRepository: IAdRepository) {}

  async save(ad: Ad): Promise<void> {
    await this.adRepository.save(ad);
  }
}
