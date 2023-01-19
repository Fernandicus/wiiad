import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export interface ICampaignsState {
  campaigns: ICampaignPrimitives[];
}

export interface ICampaignsActions {
  type: string;
  payload: ICampaignsState;
}

export const campaignInitialState: ICampaignsState = {
  campaigns: [],
};

const addCampaignsReducer = (
  state: ICampaignsState,
  action: ICampaignsActions
): void => {
  const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns!.push(campaign);
  });
};

export const campaignsReducers = {
  addCampaignsReducer,
};
