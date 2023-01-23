import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IActionReducer } from "context/common/domain/interface/IActionReducer";

export interface IAdvertiserSessionAction
  extends IActionReducer<IAdvertiserSessionState> {}

export interface IAdvertiserSessionState {
  session: IUserPrimitives;
}
