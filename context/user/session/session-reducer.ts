import { TSessionStatus } from "@/components/hooks/interfaces/UserTypes";
import { IUserState } from "@/context/interfaces/IUserState";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { PayloadAction } from "@reduxjs/toolkit";

export const userInitialState: IUserState = {
  status: "non-init",
  session: {
    email: "",
    id: "",
    name: "",
    profilePic: "",
    role: "",
  },
};

export const changeUserSessionReducer = (
  state: IUserState,
  action: PayloadAction<{
    status: TSessionStatus;
  }>
) => {
  state.status = action.payload.status;
};

export const storeUserSessionReducer = (
  state: IUserState,
  action: PayloadAction<IUserPrimitives>
) => {
  state.session = action.payload;
};
