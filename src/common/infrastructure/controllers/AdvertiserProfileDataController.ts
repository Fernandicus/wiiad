import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";

export class AdvertiserProfileDataController {
  constructor() {}

  async getAdvertiserData(
    advertiserId: string
  ): Promise<IAdvertiserDataPrimitives> {
    const [campaignsResp, adsResp, stripeCustomerResp] =
      await Promise.allSettled([
        findCampaignHandler.byAdvertiserId(advertiserId),
        adFinderHandler.findAll(advertiserId),
        findCustomerHandler.ByUserId(advertiserId),
      ]);

    const campaigns = this.getValueArray(campaignsResp);
    const ads = this.getValueArray(adsResp);
    const stripeCustomer = this.getValue(stripeCustomerResp);

    if (!stripeCustomer) return { campaigns, ads };
    return { campaigns, ads, stripeCustomer };
  }

  private getValueArray<T>(resp: PromiseSettledResult<T[]>): T[] {
    return resp.status == "rejected" ? [] : resp.value;
  }

  private getValue<T>(resp: PromiseSettledResult<T>): T | undefined {
    return resp.status === "rejected" ? undefined : resp.value;
  }
}
