import {
  IAdvertiserSessionAction,
  IAdvertiserStatusAction,
} from "../domain/interfaces/IAdvertiserAction";
import {
  IAdvertiserSessionState,
  IAdvertiserStatusState,
} from "../domain/interfaces/IAdvertiserState";

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
