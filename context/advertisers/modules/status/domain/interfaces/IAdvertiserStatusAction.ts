import { IActionReducer } from "context/common/domain/interface/IActionReducer";
import { IAdvertiserStatusState } from "./IAdvertiserStatusState";

export interface IAdvertiserStatusAction
  extends IActionReducer<IAdvertiserStatusState> {}
