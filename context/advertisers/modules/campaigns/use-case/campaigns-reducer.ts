import { ICampaignsAction } from "../domain/interfaces/ICampaignsAction";
import { ICampaignsState } from "../domain/interfaces/ICampaignsState";

const storeCampaignsReducer = (
  state: ICampaignsState,
  action: ICampaignsAction
): void => {
  const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns.push(campaign);
  });
};

export const campaignsReducers = {
  storeCampaignsReducer,
};
