import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export interface ICampaignsState {
  campaigns: ICampaignPrimitives[];
}

export interface ICampaignsAction {
  type: string;
  payload: ICampaignsState;
}

export const campaignInitialState: ICampaignsState = {
  campaigns: [],
};

const addCampaignsReducer = (
  state: ICampaignsState,
  action: ICampaignsAction
): void => {
  const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns.push(campaign);
  });
};

export const campaignsReducers = {
  addCampaignsReducer,
};
