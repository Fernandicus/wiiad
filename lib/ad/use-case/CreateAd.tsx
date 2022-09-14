import { Ad } from "../domain/Ad";
import { DataBase } from "../domain/DataBase";

export class CreateAd {
  constructor(private repository: DataBase) {}

  async save(ad: Ad): Promise<void> {
    await this.repository.save(ad);
  }
}
