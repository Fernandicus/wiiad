import { IAdsContext } from "context/advertisers/modules/ads/domain/interfaces/IAdsContext";
import { ICampaignsContext } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsContext";
import { IAdvertiserStatusContext } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusContext";

export interface IAdvertiserStore<T>
  extends ICampaignsContext<T>,
    IAdsContext<T>,
    IAdvertiserStatusContext<T> {}
