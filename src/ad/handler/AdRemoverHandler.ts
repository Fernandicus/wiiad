import { AdId } from "../domain/value-objects/AdId";
import { RemoveAd } from "../use-case/RemoveAd";

export class AdRemoverHandler {
  constructor(private removeAd: RemoveAd) {}

  async remove(adId: string): Promise<void> {
    const id = new AdId(adId);
    await this.removeAd.byId(id);
  }
}
