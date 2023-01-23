import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import {
  IAdvertiserSessionCtxState,
  IAdvertiserStatusCtxState,
} from "context/advertisers/modules/status/domain/interfaces/IAdvertiserSessionContext";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusAction";
import {
  changeSessionReducer,
  storeAdvertiserSession,
} from "context/advertisers/modules/status/infrastructure/session-slices";
import { useDispatch, useSelector } from "react-redux";

interface IUseAdvertiserState {
  status: TAdvertiserStatusState;
  session: IUserPrimitives;
  changeStatus(newStatus: TAdvertiserStatusState): void;
  storeSession(user: IUserPrimitives): void;
}

export const useAdvertiserState = (): IUseAdvertiserState => {
  const dispatch = useDispatch();

  const status = useSelector(
    (state: IAdvertiserStatusCtxState) => state.session.status
  );
  const session = useSelector(
    (state: IAdvertiserSessionCtxState) => state.session.session
  );

  const changeStatus = (newStatus: TAdvertiserStatusState) => {
    dispatch(changeSessionReducer({ status: newStatus }));
  };
  const storeSession = (user: IUserPrimitives) => {
    dispatch(storeAdvertiserSession({ session: user }));
  };

  return { status, session, storeSession, changeStatus };
};
