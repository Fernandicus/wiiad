import { createSlice } from "@reduxjs/toolkit";
import {
  advertiserInitialState,
  changeSessionReducer,
  storeAdvertiserSessionReducer,
} from "./session-reducer";

const advertiserSlices = createSlice({
  name: "advertiser-status",
  initialState: advertiserInitialState,
  reducers: {
    changeSession: changeSessionReducer,
    storeAdvertiser: storeAdvertiserSessionReducer,
  },
});

export const advertiserSlicesActions = advertiserSlices.actions;
export const advertiserSlicesReducer = advertiserSlices.reducer;
