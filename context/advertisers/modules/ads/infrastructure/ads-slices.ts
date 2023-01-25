import { createSlice } from "@reduxjs/toolkit";
import { adsInitialState } from "../domain/AdInitialState";
import { adsReducers } from "../use-case/ads-reducer";

export const adsSlice = createSlice({
  name: "ads",
  initialState: adsInitialState,
  reducers: adsReducers,
});

export const { storeAdsReducer, removeAdReducer } = adsSlice.actions;
