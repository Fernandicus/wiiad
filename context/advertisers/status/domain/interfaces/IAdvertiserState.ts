import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

export type TAdvertiserStatusState = "init" | "non-init";

export interface IAdvertiserState
  extends IAdvertiserSessionState,
    IAdvertiserStatusState {}

export interface IAdvertiserStatusState {
  status: TAdvertiserStatusState;
}

export interface IAdvertiserSessionState {
  session: IUserPrimitives;
}
