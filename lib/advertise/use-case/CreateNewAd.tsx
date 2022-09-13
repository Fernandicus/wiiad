import { Advertise } from "../domain/Advertise";
import Repository from "../domain/Repository";

export default class CreateNewAd {
  constructor(private repository: Repository) {}

  async save(advertise: Advertise): Promise<void> {
    await this.repository.save(advertise);
  }
}
