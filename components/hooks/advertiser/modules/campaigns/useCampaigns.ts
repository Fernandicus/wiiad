import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { ICampaignsCtxState } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsContext";
import { storeCampaignsReducer } from "context/advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { useDispatch, useSelector } from "react-redux";

interface IUseCampaigns {
  campaigns: ICampaignPrimitives[];
  storeCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useCampaigns = (): IUseCampaigns => {
  const campaigns = useSelector(
    (state: ICampaignsCtxState) => state.campaigns.campaigns
  );
  const dispatch = useDispatch();

  return {
    campaigns,
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      if (campaigns.length == 0)
        throw new Error("Store campaigns can't contain an empty array");
      dispatch(storeCampaignsReducer({ campaigns }));
    },
  };
};
