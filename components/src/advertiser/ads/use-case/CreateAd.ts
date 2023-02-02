import { Ad } from "@/src/modules/ad/domain/Ad";
import { IAdsApiCalls } from "../domain/interfaces/IAdsApiCalls";

export class CreateAd {
  constructor(private apiCall: IAdsApiCalls) {}

  async create(ad: Ad): Promise<void> {
    await this.apiCall.createAd(ad);
  }
}
