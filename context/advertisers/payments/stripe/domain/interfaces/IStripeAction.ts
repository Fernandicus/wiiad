import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import { IStripeState } from "./IStripeState";

export interface IStripeAction extends IActionReducer<IStripeState> {}
