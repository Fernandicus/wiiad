import { IRemoveCampaignsAction, IStoreCampaignsAction } from "../domain/interfaces/ICampaignsAction";
import { ICampaignsState, IRemoveCampaignsState, IStoreCampaignsState } from "../domain/interfaces/ICampaignsState";

const storeCampaignsReducer = (
  state: IStoreCampaignsState,
  action: IStoreCampaignsAction
): void => {
  const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns.push(campaign);
  });
};

const removeCampaignsReducer_byAdId = (
  state: IRemoveCampaignsState,
  action: IRemoveCampaignsAction
): void => {
  const index = state.campaigns.findIndex((campaign) => campaign.advertiserId == action.payload.adId);
  state.campaigns.splice(index, 1);
  /* const newCampaigns = action.payload.campaigns;
  newCampaigns.forEach((campaign) => {
    state.campaigns.push(campaign);
  }); */
};

export const campaignsReducers = {
  storeCampaignsReducer,
  removeCampaignsReducer_byAdId
};
