import { adFinderHandler } from "../../ad/ad-container";
import { AdPropsPrimitives } from "../../ad/domain/Ad";
import { findCampaignHandler } from "../../campaign/container";
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

    const campaigns: ICampaignPrimitives[] =
      response[0].status == "rejected" ? [] : response[0].value;

    const ads: AdPropsPrimitives[] =
      response[1].status == "rejected" ? [] : response[1].value;

    const stripeCustomer: IStripePrimitives | null =
      response[2].status == "rejected" ? null : response[2].value;

    return { campaigns, ads, stripeCustomer };
  }
}
