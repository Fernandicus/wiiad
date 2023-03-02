import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

export type TSessionStatus = "init" | "non-init";

export interface IUseSession {
  status: TSessionStatus;
  initStore(session: IUserPrimitives): Promise<void>;
  session: IUserPrimitives;
}

export interface IUseSessionState {
  status: TSessionStatus;
  session: IUserPrimitives;
  changeStatus(newStatus: TSessionStatus): void;
  storeSession(user: IUserPrimitives): void;
}