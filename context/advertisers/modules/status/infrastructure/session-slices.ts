import { createSlice } from "@reduxjs/toolkit";
import { advertiserInitialState } from "../domain/AdvertiserInitialState";
import { statusReducers } from "../use-case/session-reducer";

export const advertiserSessionSlices = createSlice({
  name: "advertiser-status",
  initialState: advertiserInitialState,
  reducers: statusReducers,
});

export const { changeSessionReducer, storeAdvertiserSession } =
  advertiserSessionSlices.actions;
