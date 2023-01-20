import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";

export class ProfileDataController {
  constructor() {}

  async getAdvertiserData(advertiserId: string): Promise<IAdvertiserDataPrimitives> {
    const findCampaigns = findCampaignHandler.byAdvertiserId(advertiserId);
    const findAds = adFinderHandler.findAll(advertiserId);
    const findStripeCustomer = findCustomerHandler.ByUserId(advertiserId);

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

  private getValueArray<T>(resp: PromiseSettledResult<T[]>): T[] {
    return resp.status == "rejected" ? [] : resp.value;
  }

  private getValue<T>(resp: PromiseSettledResult<T>): T | undefined {
    return resp.status === "rejected" ? undefined : resp.value;
  }
}
