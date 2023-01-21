import { IAdvertiserStatusCtxState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusContext";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusState";
import { changeStatusReducer } from "context/advertisers/modules/status/infrastructure/status-slices";
import { useDispatch, useSelector } from "react-redux";

export const useAdvertiserStatus = () => {
  const status = useSelector(
    (state: IAdvertiserStatusCtxState) => state.status.status
  );
  const dispatch = useDispatch();

  const changeStatus = (newStatus: TAdvertiserStatusState) => {
    dispatch(changeStatusReducer({ status: newStatus }));
  };
  return { status, changeStatus };
};
