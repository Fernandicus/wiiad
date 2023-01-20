import { createSlice } from "@reduxjs/toolkit";
import { adsInitialState } from "../domain/AdInitialState";
import { adsReducers } from "./ads-reducer";

export const adsSlice = createSlice({
  name: "ads",
  initialState: adsInitialState,
  reducers: adsReducers,
});

export const { addAdsReducer } = adsSlice.actions;
