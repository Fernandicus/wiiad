import { IAction } from "context/advertisers/common/domain/interfaces/IAction";
import { IStripeState } from "./IStripeState";

export interface IStripeAction extends IAction<IStripeState> {}
