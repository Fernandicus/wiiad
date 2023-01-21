import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { ICampaignsCtxState } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsContext";
import { storeCampaignsReducer } from "context/advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { useDispatch, useSelector } from "react-redux";

export const useCampaigns = () => {
  const campaigns = useSelector(
    (state: ICampaignsCtxState) => state.campaigns.campaigns
  );
  const dispatch = useDispatch();

  return {
    campaigns,
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      dispatch(storeCampaignsReducer({ campaigns }));
    },
  };
};
