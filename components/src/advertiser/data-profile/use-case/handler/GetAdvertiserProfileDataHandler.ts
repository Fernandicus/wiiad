import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { GetAdvertiserProfileData } from "../GetAdvertiserProfileData";

export class GetAdvertiserProfileDataHandler {
  constructor(private getAdvertiserData: GetAdvertiserProfileData) {}

  async getAll(): Promise<IAdvertiserDataPrimitives> {
    const advertiserData = await this.getAdvertiserData.getData();
    return {
      ads: advertiserData.ads.map((ad) => ad.toPrimitives()),
      campaigns: advertiserData.campaigns.map((campaign) =>
        campaign.toPrimitives()
      ),
      stripeCustomer: advertiserData.stripeCustomer?.toPrimitives(),
    };
  }
}
