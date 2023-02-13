import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { PayloadAction } from "@reduxjs/toolkit";

interface ICampaignsState {
  campaigns: ICampaignPrimitives[];
}

export const campaignInitialState: ICampaignsState = {
  campaigns: [],
};

export const storeCampaignsReducer = (
  state: ICampaignsState,
  action: PayloadAction<ICampaignsState>
): void => {
  const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns.push(campaign);
  });
};

export const removeCampaignsReducerByAdId = (
  state: ICampaignsState,
  action: PayloadAction<{
    adId: string;
  }>
): void => {
  const index = state.campaigns.findIndex(
    (campaign) => campaign.adId == action.payload.adId
  );
  state.campaigns.splice(index, 1);
};
