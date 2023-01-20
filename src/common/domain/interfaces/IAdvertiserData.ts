import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { Campaign, ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IStripePrimitives, Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";

export interface IAdvertiserData {
  campaigns: Campaign[];
  ads: Ad[];
  stripeCustomer?: Stripe;
}

export interface IAdvertiserDataPrimitives {
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
  stripeCustomer?: IStripePrimitives;
}