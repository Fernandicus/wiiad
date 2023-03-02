import { TUserState } from "@/context/store";
import { userSlicesActions } from "@/context/user/session/session-slice";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useDispatch, useSelector } from "react-redux";
import { IUseSessionState, TSessionStatus } from "./interfaces/UserTypes";

export const useUserState = (): IUseSessionState => {
  const { changeSession, storeUser } = userSlicesActions;
  const dispatch = useDispatch();
  const state = useSelector((state: TUserState) => state.userSession);

  const changeStatus = (newStatus: TSessionStatus) => {
    dispatch(changeSession({ status: newStatus }));
  };
  const storeSession = (session: IUserPrimitives) => {
    dispatch(storeUser(session));
  };

  return {
    status: state.status,
    session: state.session,
    storeSession,
    changeStatus,
  };
};
