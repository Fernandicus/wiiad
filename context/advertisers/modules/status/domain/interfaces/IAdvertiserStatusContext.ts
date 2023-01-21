import { IAdvertiserStatusState } from "./IAdvertiserStatusState";

export interface IAdvertiserStatusContext<T> {
  status: T;
}

export interface IAdvertiserStatusCtxState
  extends IAdvertiserStatusContext<IAdvertiserStatusState> {}
