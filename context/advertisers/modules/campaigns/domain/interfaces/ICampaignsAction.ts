import { IActionReducer } from "context/advertisers/common/domain/interfaces/IActionReducer";
import { ICampaignsState } from "./ICampaignsState";

export interface ICampaignsAction extends IActionReducer<ICampaignsState> {}
