import { IAdsState } from "context/advertisers/modules/ads/domain/interfaces/IAdsState";
import { ICampaignsState } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsState";
import { IAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusState";

type TCampaigns<T> = { campaigns: T };
type TAds<T> = { ads: T };
type TStatus<T> = { status: T};

type TCampaignState = TCampaigns<ICampaignsState>;
type TAdState = TAds<IAdsState>;
type TAdvertiserStatusState = TStatus<IAdvertiserStatusState>;

export interface IAdvertiserState
  extends TCampaignState,
    TAdState,
    TAdvertiserStatusState {}

export interface IAdvertiserStore<T>
  extends TCampaigns<T>,
    TAds<T>,
    TStatus<T> {}
