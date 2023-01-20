import { createSlice } from "@reduxjs/toolkit";
import { campaignInitialState } from "../reducers/campaigns-reducer";
import { campaignsReducers } from "../reducers/campaigns-reducer";

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: campaignInitialState,
  reducers: campaignsReducers,
});

export const { addCampaignsReducer } = campaignsSlice.actions;
