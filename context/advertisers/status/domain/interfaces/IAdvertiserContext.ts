import { IAdvertiserSessionState, IAdvertiserStatusState } from "./IAdvertiserState";


export interface IAdvertiserSessionContext<T> {
  session: T;
}

export interface IAdvertiserSessionCtxState
  extends IAdvertiserSessionContext<IAdvertiserSessionState> {}


export interface IAdvertiserStatusCtxState
extends IAdvertiserSessionContext<IAdvertiserStatusState> {}
