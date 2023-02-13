import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  campaignInitialState,
  removeCampaignsReducerByAdId,
  storeCampaignsReducer,
} from "./campaigns-reducer";

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: campaignInitialState,
  reducers: {
    removeCampaign: removeCampaignsReducerByAdId,
    storeCampaign: storeCampaignsReducer,
  },
});

export const campaignsSliceActions = campaignsSlice.actions;
export const campaignsSliceReducer = campaignsSlice.reducer;
