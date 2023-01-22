import { IActionReducer } from "context/advertisers/common/domain/interfaces/IActionReducer";
import { IAdsState } from "./IAdsState";

export interface IAdsAction extends IActionReducer<IAdsState> {}
