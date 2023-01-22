import { IActionReducer } from "context/common/domain/interface/IActionReducer";
import { IAdsState } from "./IAdsState";

export interface IAdsAction extends IActionReducer<IAdsState> {}
