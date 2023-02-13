import { campaignsSliceActions } from "@/context/advertisers/campaigns/campaigns-slices";
import {
  AppDispatch,
  TCampaignsState,
} from "@/context/common/infrastructure/store";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { useDispatch, useSelector } from "react-redux";

interface ICampaignsStates {
  all: ICampaignPrimitives[];
  actives: ICampaignPrimitives[];
  standBy: ICampaignPrimitives[];
  finished: ICampaignPrimitives[];
}

export interface IUseCampaigns {
  campaigns: ICampaignsStates;
  storeCampaigns(campaigns: ICampaignPrimitives[]): void;
  removeCampaignByAdId(adId: string): void;
}

export const useCampaigns = (): IUseCampaigns => {
  const { removeCampaign, storeCampaign } = campaignsSliceActions;
  const dispatch = useDispatch<AppDispatch>();
  const campaigns = useSelector((state: TCampaignsState): ICampaignsStates => {
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
    campaigns,
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      dispatch(storeCampaign({ campaigns }));
    },
    removeCampaignByAdId: (adId: string): void => {
      dispatch(removeCampaign({ adId }));
    },
  };
};
