import { ICampaignsCtxState } from "@/context/advertisers/campaigns/domain/interfaces/ICampaignsContext";
import { removeCampaignsReducer_byAdId, storeCampaignsReducer } from "@/context/advertisers/campaigns/infrastructure/campaigns-slices";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { useDispatch, useSelector } from "react-redux";

export interface IUseCampaigns {
  campaigns: {
    all: ICampaignPrimitives[];
    actives: ICampaignPrimitives[];
    standBy: ICampaignPrimitives[];
    finished: ICampaignPrimitives[];
  };
  storeCampaigns(campaigns: ICampaignPrimitives[]): void;
  removeCampaigns_byAdId(adId: string): void;
}

export const useCampaigns = (): IUseCampaigns => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state: ICampaignsCtxState) => {
    const campaigns = state.campaigns.campaigns;
    return {
      all: campaigns,
      actives: filterByStatus(campaigns, CampaignStatusType.ACTIVE),
      standBy: filterByStatus(campaigns, CampaignStatusType.STAND_BY),
      finished: filterByStatus(campaigns, CampaignStatusType.FINISHED),
    };
  });

  function filterByStatus(
    campaigns: ICampaignPrimitives[],
    status: CampaignStatusType
  ): ICampaignPrimitives[] {
    return campaigns.filter((campaign) => campaign.status === status);
  }

  return {
    campaigns: {
      all: campaigns.all,
      actives: campaigns.actives,
      standBy: campaigns.standBy,
      finished: campaigns.finished,
    },
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      dispatch(storeCampaignsReducer({ campaigns }));
    },
    removeCampaigns_byAdId: (adId: string): void => {
      dispatch(
        removeCampaignsReducer_byAdId({  adId })
      );
    },
  };
};
