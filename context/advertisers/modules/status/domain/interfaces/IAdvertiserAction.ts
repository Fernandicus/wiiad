import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import {
  IAdvertiserSessionState,
  IAdvertiserStatusState,
} from "./IAdvertiserState";

export interface IAdvertiserStatusAction
  extends IActionReducer<IAdvertiserStatusState> {}

export interface IAdvertiserSessionAction
  extends IActionReducer<IAdvertiserSessionState> {}
