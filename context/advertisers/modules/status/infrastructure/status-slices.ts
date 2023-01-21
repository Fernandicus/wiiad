import { createSlice } from "@reduxjs/toolkit";
import { statusInitialState } from "../domain/StatusInitialState";
import { statusReducers } from "../use-case/status-reducer";

export const advertiserStatusSlices = createSlice({
  name: "advertiser-status",
  initialState: statusInitialState,
  reducers: statusReducers,
});

export const { changeStatusReducer } = advertiserStatusSlices.actions;
