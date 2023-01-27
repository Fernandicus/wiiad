import { IAdsContext } from "@/context/advertisers/ads/domain/interfaces/IAdsContext";
import { ICampaignsContext } from "@/context/advertisers/campaigns/domain/interfaces/ICampaignsContext";
import { IPaymentProcessContext } from "@/context/advertisers/payments/payment-process/domain/interfaces/IPaymentProcessContext";
import { IStripeContext } from "@/context/advertisers/payments/stripe/domain/interfaces/IStripeContext";
import { IAdvertiserSessionContext } from "@/context/advertisers/status/domain/interfaces/IAdvertiserContext";


export interface IAdvertiserStore<T>
  extends ICampaignsContext<T>,
    IAdsContext<T>,
    IAdvertiserSessionContext<T>,
    IStripeContext<T>,
    IPaymentProcessContext<T> {}
