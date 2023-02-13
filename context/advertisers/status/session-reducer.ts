import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { PayloadAction } from "@reduxjs/toolkit";

export type TAdvertiserStatusState = "init" | "non-init";

export interface IAdvertiserState {
  status: TAdvertiserStatusState;
  session: IUserPrimitives;
}

export const advertiserInitialState: IAdvertiserState = {
  status: "non-init",
  session: {
    email: "",
    id: "",
    name: "",
    profilePic: "",
    role: "",
  },
};

export const changeSessionReducer = (
  state: IAdvertiserState,
  action: PayloadAction<{
    status: TAdvertiserStatusState;
  }>
) => {
  state.status = action.payload.status;
};

export const storeAdvertiserSessionReducer = (
  state: IAdvertiserState,
  action: PayloadAction<IUserPrimitives>
) => {
  state.session = action.payload;
};
