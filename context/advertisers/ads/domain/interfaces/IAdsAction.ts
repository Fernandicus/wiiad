import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import { IRemoveAdState, IStoreAdsState } from "./IAdsState";

export interface IStoreAdsAction extends IActionReducer<IStoreAdsState> {}
export interface IRemoveAdAction extends IActionReducer<IRemoveAdState> {}
