import { AdRepository } from "../domain/AdRepository";
import { AdId } from "../domain/ValueObjects/AdId";
import { RemoveAd } from "../use-case/RemoveAd";

export class AdRemoverController {
  private removeAd;
  private id;

  constructor(adId: string, repository: AdRepository) {
    this.removeAd = new RemoveAd(repository);
    this.id = new AdId(adId);
  }

  async remove(): Promise<void> {
    await this.removeAd.byId(this.id);
  }
}
