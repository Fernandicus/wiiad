import { UniqId } from "@/src/utils/UniqId";
import { IAdsApiCalls } from "../domain/interfaces/IAdsApiCalls";

export class RemoveAd {
  constructor(private adsApiCall: IAdsApiCalls) {}

  async remove(adId: UniqId): Promise<void> {
    await this.adsApiCall.removeAd(adId);
  }
}
