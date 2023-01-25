import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { ICampaignsCtxState } from "context/advertisers/modules/campaigns/domain/interfaces/ICampaignsContext";
import { storeCampaignsReducer } from "context/advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { useDispatch, useSelector } from "react-redux";

export interface IUseCampaigns {
  campaigns: {
    all: ICampaignPrimitives[];
    actives: ICampaignPrimitives[];
    standBy: ICampaignPrimitives[];
    finished: ICampaignPrimitives[];
  };
  storeCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useCampaigns = (): IUseCampaigns => {
  const campaigns = useSelector(
    (state: ICampaignsCtxState) => state.campaigns.campaigns
  );
  const dispatch = useDispatch();
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === CampaignStatusType.ACTIVE
  );
  const standByCampaigns = campaigns.filter(
    (campaign) => campaign.status === CampaignStatusType.STAND_BY
  );
  const finishedCampaigns = campaigns.filter(
    (campaign) => campaign.status === CampaignStatusType.FINISHED
  );

  return {
    campaigns: {
      all: campaigns,
      actives: activeCampaigns,
      standBy: standByCampaigns,
      finished: finishedCampaigns,
    },
    storeCampaigns: (campaigns: ICampaignPrimitives[]): void => {
      if (campaigns.length == 0)
        throw new Error("Store campaigns can't contain an empty array");
      dispatch(storeCampaignsReducer({ campaigns }));
    },
  };
};
