import { getCampaignsHandler } from "@/components/src/modules/campaigns/infrastructure/campaigns-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { ICampaignsState } from "context/advertisers/reducers/campaigns-reducer";
import { addCampaignsReducer } from "context/advertisers/slices/campaigns-slices";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TUseCampaignsStatus = "non-init" | "init";

interface IUseCampaigns {
  status: TUseCampaignsStatus;
  init(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  addCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useCampaigns = (): IUseCampaigns => {
  const [status, setStatus] = useState<TUseCampaignsStatus>("non-init");
  const campaignsState = useSelector(
    (state: ICampaignsState) => state.campaigns
  );
  const dispatch = useDispatch();

  //TODO: CALL API ROUTE THAT RETURN ALL ProfileDataController .getAdvertiserData()

  const init = async (): Promise<void> => {
    if (status !== "non-init") return;
    try {
      const campaigns = await getCampaignsHandler.getAll();
      dispatch(addCampaignsReducer({ campaigns }));
      if (status === "non-init") setStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  const addCampaigns = (campaigns: ICampaignPrimitives[]): void => {
    if (campaignsState.length == 0)
      throw new Error("Add campaigns can't contain an empty array");
    dispatch(addCampaignsReducer({ campaigns }));
    if (status === "non-init") setStatus("init");
  };

  return {
    init,
    status,
    campaigns: campaignsState,
    addCampaigns,
  };
};
