import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface ICampaignsState {
  campaigns: ICampaignPrimitives[];
}

export interface ICampaignsActions {
  type: string;
  payload: ICampaignsState;
}

const initState: ICampaignsState = {
  campaigns: [],
};

const slice = createSlice({
  name: "campaigns",
  initialState: initState,
  reducers: {
    addCampaigns: (state, action: ICampaignsActions) => {
      const newCampaigns = action.payload.campaigns;
      const campaigns = state.campaigns.concat(newCampaigns);
      console.log(newCampaigns);
      return { ...state, campaigns };
    },
    removeCampaigns: () => {},
  },
});

export const campaignsStore = configureStore({ reducer: slice.reducer });
export const { addCampaigns, removeCampaigns } = slice.actions;
