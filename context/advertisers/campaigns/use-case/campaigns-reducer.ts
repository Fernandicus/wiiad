import {
  IRemoveCampaignsAction,
  IStoreCampaignsAction,
} from "../domain/interfaces/ICampaignsAction";
import {
  ICampaignsState,
  IRemoveCampaignsState,
  IStoreCampaignsState,
} from "../domain/interfaces/ICampaignsState";

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
  state: IStoreCampaignsState,
  action: IRemoveCampaignsAction
): void => {
  const index = state.campaigns.findIndex(
    (campaign) => campaign.adId == action.payload.adId
  );
  state.campaigns.splice(index, 1);
};

export const campaignsReducers = {
  storeCampaignsReducer,
  removeCampaignsReducer_byAdId,
};
