import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { campaignInitialState } from "../domain/CampaignInitialState";
import { campaignsReducers } from "../use-case/campaigns-reducer";

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: campaignInitialState,
  reducers: campaignsReducers,
});

export const { storeCampaignsReducer, removeCampaignsReducerByAdId } = campaignsSlice.actions;
