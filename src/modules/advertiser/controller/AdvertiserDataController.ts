import { adFinderHandler } from "../../ad/infraestructure/ad-container";
import { AdPropsPrimitives } from "../../ad/domain/Ad";
import { findCampaignHandler } from "../../campaign/infrastructure/campaign-container";
import { ICampaignPrimitives } from "../../campaign/domain/Campaign";
import { IStripePrimitives } from "../../payment-methods/stripe/domain/Stripe";
import { findCustomerHandler } from "../../payment-methods/stripe/stripe-container";

interface IAdsAndCampaigns {
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
  stripeCustomer: IStripePrimitives | null;
}

export class AdvertiserDataController {
  static async getAll(advertiserId: string): Promise<IAdsAndCampaigns> {
    const findCampaigns = findCampaignHandler.byAdvertiserId(advertiserId);
    const findAds = adFinderHandler.findAll(advertiserId);
    const findStripeCustomer = findCustomerHandler.findByUserId(advertiserId);

    const response = await Promise.allSettled([
      findCampaigns,
      findAds,
      findStripeCustomer,
    ]);

    const campaigns = this.getValueArray(response[0]);
    const ads = this.getValueArray(response[1]);
    const stripeCustomer = this.getValue(response[2]);

    return { campaigns, ads, stripeCustomer };
  }

  private static getValueArray<T>(resp: PromiseSettledResult<T[]>): T[] {
    return resp.status == "rejected" ? [] : resp.value;
  }

  private static getValue<T>(resp: PromiseSettledResult<T>): T | null {
    return resp.status == "rejected" ? null : resp.value;
  }
}
