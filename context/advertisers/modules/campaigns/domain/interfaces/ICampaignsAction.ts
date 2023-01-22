import { IActionReducer } from "context/common/domain/interface/IActionReducer";
import { ICampaignsState } from "./ICampaignsState";

export interface ICampaignsAction extends IActionReducer<ICampaignsState> {}
