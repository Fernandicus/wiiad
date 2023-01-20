import { IAdsState } from "context/advertisers/modules/ads/domain/interfaces/IAdsState";
import { ICampaignsState } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsState";

type TCampaigns<T> = { campaigns: T };
type TAds<T> = { ads: T };

type TCampaignState = TCampaigns<ICampaignsState>;
type TAdState = TAds<IAdsState>;

export interface IAdvertiserState extends TCampaignState, TAdState {}
export interface IAdvertiserStore<T> extends TCampaigns<T>, TAds<T> {}
