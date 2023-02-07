import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import { IRemovePMStripeState, IStripeState } from "./IStripeState";

export interface IStoreStripeAction extends IActionReducer<IStripeState> {}
export interface IRemovePMStripeAction extends IActionReducer<IRemovePMStripeState> {}
