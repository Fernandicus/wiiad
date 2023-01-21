import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/infrastructure/advertiser-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusState";
import { useCampaigns } from "./modules/campaigns/useCampaigns";
import { useAdvertiserStatus } from "./modules/state/useAdvertiserStatus";

interface IUseCampaigns {
  status: TAdvertiserStatusState;
  initStore(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  saveCampaigns(campaigns: ICampaignPrimitives[]): void;
}

export const useAdvertiser = (): IUseCampaigns => {
  const { status, changeStatus } = useAdvertiserStatus();
  const { campaigns, storeCampaigns } = useCampaigns();

  //TODO: CALL API ROUTE THAT RETURN ALL ProfileDataController .getAdvertiserData()
  const initStore = async (): Promise<void> => {
    if (status === "init") return;
    try {
      const profileData = await getAdvertiserProfileDataHandler.getAll();
      storeCampaigns(profileData.campaigns);
      changeStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  const saveCampaigns = (newCampaigns: ICampaignPrimitives[]): void => {
    if (campaigns.length == 0)
      throw new Error("Add campaigns can't contain an empty array");
    storeCampaigns(newCampaigns);
    if (status === "non-init") changeStatus("init");
  };

  return {
    initStore,
    status,
    campaigns,
    saveCampaigns,
  };
};
