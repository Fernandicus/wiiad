import { TSessionStatus } from "@/components/hooks/interfaces/UserTypes";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

export interface IUserState {
  status: TSessionStatus;
  session: IUserPrimitives;
}
