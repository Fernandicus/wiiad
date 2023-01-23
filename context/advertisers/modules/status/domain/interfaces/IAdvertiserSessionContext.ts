import { IAdvertiserSessionState } from "./IAdvertiserSessionAction";
import { IAdvertiserStatusState } from "./IAdvertiserStatusAction";

export interface IAdvertiserSessionContext<T> {
  session: T;
}

export interface IAdvertiserSessionCtxState
  extends IAdvertiserSessionContext<IAdvertiserSessionState> {}


export interface IAdvertiserStatusCtxState
extends IAdvertiserSessionContext<IAdvertiserStatusState> {}
