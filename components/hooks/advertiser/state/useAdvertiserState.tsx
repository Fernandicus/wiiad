import { TAdvertiserStatusState } from "@/context/advertisers/status/session-reducer";
import { advertiserSlicesActions } from "@/context/advertisers/status/session-slices";
import { TAdvertiserState } from "@/context/store";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useDispatch, useSelector } from "react-redux";

interface IUseAdvertiserState {
  status: TAdvertiserStatusState;
  session: IUserPrimitives;
  changeStatus(newStatus: TAdvertiserStatusState): void;
  storeSession(user: IUserPrimitives): void;
}

export const useAdvertiserState = (): IUseAdvertiserState => {
  const { changeSession, storeAdvertiser } = advertiserSlicesActions;
  const dispatch = useDispatch();
  const state = useSelector((state: TAdvertiserState) => state.session);

  const changeStatus = (newStatus: TAdvertiserStatusState) => {
    dispatch(changeSession({ status: newStatus }));
  };
  const storeSession = (session: IUserPrimitives) => {
    dispatch(storeAdvertiser(session));
  };

  return {
    status: state.status,
    session: state.session,
    storeSession,
    changeStatus,
  };
};
