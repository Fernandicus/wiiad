import { ICampaignsState } from "./ICampaignsState";

export interface ICampaignsAction {
    type: string;
    payload: ICampaignsState;
  }