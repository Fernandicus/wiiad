import { configureStore, createSlice } from "@reduxjs/toolkit";
import { campaignInitialState } from "../reducers/campaigns-reducer";
import { campaignsReducers } from "../reducers/campaigns-reducer";

const slice = createSlice({
  name: "campaigns",
  initialState: campaignInitialState,
  reducers: campaignsReducers,
});

export const campaignsStore = configureStore({ reducer: slice.reducer });
export const { addCampaignsReducer } = slice.actions;
