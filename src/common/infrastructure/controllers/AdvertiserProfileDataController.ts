import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";

export class AdvertiserProfileDataController {
  constructor() {}

  async getAdvertiserData(
    advertiserId: string
  ): Promise<IAdvertiserDataPrimitives> {
    const findCampaigns = findCampaignHandler.byAdvertiserId(advertiserId);
    const findAds = adFinderHandler.findAll(advertiserId);
    const findStripeCustomer = findCustomerHandler.ByUserId(advertiserId);

    const [campaignsResp, adsResp, stripeCustomerResp] =
      await Promise.allSettled([findCampaigns, findAds, findStripeCustomer]);

    const campaigns = this.getValueArray(campaignsResp);
    const ads = this.getValueArray(adsResp);
    const stripeCustomer = this.getValue(stripeCustomerResp);

    return { campaigns, ads, stripeCustomer };
  }

  private getValueArray<T>(resp: PromiseSettledResult<T[]>): T[] {
    return resp.status == "rejected" ? [] : resp.value;
  }

  private getValue<T>(resp: PromiseSettledResult<T>): T | undefined {
    return resp.status === "rejected" ? undefined : resp.value;
  }
}
