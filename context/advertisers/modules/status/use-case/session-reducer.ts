import {
  IAdvertiserSessionAction,
  IAdvertiserSessionState,
} from "../domain/interfaces/IAdvertiserSessionAction";
import {
  IAdvertiserStatusAction,
  IAdvertiserStatusState,
} from "../domain/interfaces/IAdvertiserStatusAction";

const changeSessionReducer = (
  state: IAdvertiserStatusState,
  action: IAdvertiserStatusAction
) => {
  state.status = action.payload.status;
};

const storeAdvertiserSession = (
  state: IAdvertiserSessionState,
  action: IAdvertiserSessionAction
) => {
  state.session = action.payload.session;
};

export const statusReducers = {
  changeSessionReducer,
  storeAdvertiserSession,
};
