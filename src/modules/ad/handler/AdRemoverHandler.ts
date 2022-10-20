import { UniqId } from "@/src/utils/UniqId";
import { RemoveAd } from "../use-case/RemoveAd";

export class AdRemoverHandler {
  constructor(private removeAd: RemoveAd) {}

  async remove(adId: string): Promise<void> {
    const id = new UniqId(adId);
    await this.removeAd.byId(id);
  }
}
