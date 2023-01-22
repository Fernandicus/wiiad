import { IActionReducer } from "context/advertisers/common/domain/interfaces/IActionReducer";
import { IStripeState } from "./IStripeState";

export interface IStripeAction extends IActionReducer<IStripeState> {}
