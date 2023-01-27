import { IStripeState } from "./IStripeState";

export interface IStripeContext<T>{
    stripe:T,
}

export interface IStripeCtxState extends IStripeContext<IStripeState>{}