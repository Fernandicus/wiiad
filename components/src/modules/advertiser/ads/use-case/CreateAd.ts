import { AdProvider } from "../domain/AdProvider";
import { IAdsApiCalls } from "../domain/interfaces/IAdsApiCalls";

export class CreateAd {
  constructor(private apiCall: IAdsApiCalls) {}

  async create(ad: AdProvider): Promise<void> {
    await this.apiCall.createAd(ad);
  }
}
