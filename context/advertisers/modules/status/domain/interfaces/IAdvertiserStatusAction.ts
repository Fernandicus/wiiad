import { IActionReducer } from "context/common/domain/interface/IActionReducer";

export interface IAdvertiserStatusState {
  status: TAdvertiserStatusState;
}

export type TAdvertiserStatusState = "init" | "non-init";

export interface IAdvertiserStatusAction
  extends IActionReducer<IAdvertiserStatusState> {}
