import { IActionReducer } from "context/common/domain/interface/IActionReducer";
import { ICampaignsState, IRemoveCampaignsState, IStoreCampaignsState } from "./ICampaignsState";

export interface IStoreCampaignsAction extends IActionReducer<IStoreCampaignsState> {}
export interface IRemoveCampaignsAction extends IActionReducer<IRemoveCampaignsState> {}
