import { IAdsContext } from "context/advertisers/modules/ads/domain/interfaces/IAdsContext";
import { ICampaignsContext } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsContext";
import { IStripeContext } from "context/advertisers/modules/payments/stripe/domain/interfaces/IStripeContext";
import { IAdvertiserSessionContext } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserSessionContext";

export interface IAdvertiserStore<T>
  extends ICampaignsContext<T>,
    IAdsContext<T>,
    IAdvertiserSessionContext<T>,
    IStripeContext<T> {}
