import { IAdvertiserStatusState } from "../domain/interfaces/IAdvertiserStatusState";
import { IAdvertiserStatusAction } from "../domain/interfaces/IAdvertiserStatusAction";

const changeStatusReducer = (
  state: IAdvertiserStatusState,
  action: IAdvertiserStatusAction
) => {
  state.status = action.payload.status;
};

export const statusReducers = {
  changeStatusReducer,
};
