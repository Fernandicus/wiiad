import { ICampaignsState } from "./ICampaignsState";

export interface ICampaignsContext<T> {
  campaigns: T;
}

export interface ICampaignsCtxState
  extends ICampaignsContext<ICampaignsState> {}
