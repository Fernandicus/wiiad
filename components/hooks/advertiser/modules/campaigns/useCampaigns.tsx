import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IAdvertiserState } from "context/advertisers/common/domain/interfaces/IAdvertiserStoreState";
import { storeCampaignsReducer } from "context/advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { useDispatch, useSelector } from "react-redux";

export const useCampaigns = () => {
  const campaigns = useSelector(
    (state: IAdvertiserState) => state.campaigns.campaigns
  );
  const dispatch = useDispatch();

  return {
    campaigns,
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      dispatch(storeCampaignsReducer({ campaigns }));
    },
  };
};
