import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/infrastructure/advertiser-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { addCampaignsReducer } from "context/advertisers/modules/campaigns/infrastructure/campaigns-slices";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAdvertiserState } from "context/advertisers/common/domain/interfaces/IAdvertiserStoreState";

type TUseAdvertiserStatus = "non-init" | "init";

interface IUseCampaigns {
  status: TUseAdvertiserStatus;
  init(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  addCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useAdvertiser = (): IUseCampaigns => {
  const [status, setStatus] = useState<TUseAdvertiserStatus>("non-init");
  const campaignsState = useSelector(
    (state: IAdvertiserState) => state.campaigns.campaigns
  );
  const dispatch = useDispatch();

  //TODO: CALL API ROUTE THAT RETURN ALL ProfileDataController .getAdvertiserData()

  const init = async (): Promise<void> => {
    if (status !== "non-init") return;
    try {
      const profileData = await getAdvertiserProfileDataHandler.getAll();
      dispatch(addCampaignsReducer({ campaigns: profileData.campaigns }));
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
