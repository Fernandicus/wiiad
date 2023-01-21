import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/infrastructure/advertiser-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { useState } from "react";
import { useCampaigns } from "./modules/campaigns/useCampaigns";

export type TAdvertiserStatus = "non-init" | "init";

interface IUseCampaigns {
  status: TAdvertiserStatus;
  initStore(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  saveCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useAdvertiser = (): IUseCampaigns => {
  const [status, setStatus] = useState<TAdvertiserStatus>("non-init");
  const { campaigns, storeCampaigns } = useCampaigns();

  //TODO: CALL API ROUTE THAT RETURN ALL ProfileDataController .getAdvertiserData()
  const initStore = async (): Promise<void> => {
    if (status !== "non-init") return;
    try {
      const profileData = await getAdvertiserProfileDataHandler.getAll();
      storeCampaigns(profileData.campaigns);
      if (status === "non-init") setStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  const saveCampaigns = (newCampaigns: ICampaignPrimitives[]): void => {
    if (campaigns.length == 0)
      throw new Error("Add campaigns can't contain an empty array");
    storeCampaigns(newCampaigns);
    if (status === "non-init") setStatus("init");
  };

  return {
    initStore,
    status,
    campaigns,
    saveCampaigns,
  };
};
