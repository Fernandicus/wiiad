import { createSlice } from "@reduxjs/toolkit";
import { advertiserSessionInitialState } from "../domain/AdvertiserSessionInitialState";
import { statusReducers } from "../use-case/session-reducer";

export const advertiserSessionSlices = createSlice({
  name: "advertiser-status",
  initialState: advertiserSessionInitialState,
  reducers: statusReducers,
});

export const { changeSessionReducer, storeAdvertiserSession } =
  advertiserSessionSlices.actions;
