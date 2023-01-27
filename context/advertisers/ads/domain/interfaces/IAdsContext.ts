import { IAdsState } from "./IAdsState";

export interface IAdsContext<T> {
  ads: T;
}

export interface IAdsCtxState extends IAdsContext<IAdsState>{}