import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserSessionReducer,
  storeUserSessionReducer,
  userInitialState,
} from "./session-reducer";

const userSlices = createSlice({
  name: "user-status",
  initialState: userInitialState,
  reducers: {
    changeSession: changeUserSessionReducer,
    storeUser: storeUserSessionReducer,
  },
});

export const userSlicesActions = userSlices.actions;
export const userSlicesReducer = userSlices.reducer;
