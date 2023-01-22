import { IActionReducer } from "context/advertisers/common/domain/interfaces/IActionReducer";
import { IAdvertiserStatusState } from "./IAdvertiserStatusState";

export interface IAdvertiserStatusAction
  extends IActionReducer<IAdvertiserStatusState> {}
