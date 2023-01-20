import { createSlice } from "@reduxjs/toolkit";
import { campaignInitialState } from "../domain/CampaignInitialState";
import { campaignsReducers } from "./campaigns-reducer";

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: campaignInitialState,
  reducers: campaignsReducers,
});

export const { addCampaignsReducer } = campaignsSlice.actions;
