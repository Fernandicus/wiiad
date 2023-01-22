import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/infrastructure/advertiser-container";
import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusState";
import { store } from "context/common/infrastructure/store";
import { useAds } from "./modules/ads/useAds";
import { useCampaigns } from "./modules/campaigns/useCampaigns";
import { useAdvertiserStatus } from "./modules/state/useAdvertiserStatus";

interface IUseAdvertiser {
  status: TAdvertiserStatusState;
  initStore(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  saveCampaigns(campaigns: ICampaignPrimitives[]): void;
  ads: AdPropsPrimitives[];
  saveAds(ads: AdPropsPrimitives[]): void;
}

export const useAdvertiser = (): IUseAdvertiser => {
  const { campaigns, storeCampaigns } = useCampaigns();
  const { ads, storeAds } = useAds();
  const { status, changeStatus } = useAdvertiserStatus();

  const initStore = async (): Promise<void> => {
    if (status === "init") return;
    try {
      await storeProfile();
      changeStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  const storeProfile = async () => {
    const profileData = await getAdvertiserProfileDataHandler.getAll();
    storeCampaigns(profileData.campaigns);
    storeAds(profileData.ads);
  };

  function changeNonInitStatus() {
    if (status === "non-init") changeStatus("init");
  }

  return {
    initStore,
    status,
    campaigns,
    saveCampaigns: (newCampaigns: ICampaignPrimitives[]) => {
      storeCampaigns(newCampaigns);
      changeNonInitStatus();
    },
    ads,
    saveAds: (newAds: AdPropsPrimitives[]) => {
      storeAds(newAds);
      changeNonInitStatus();
    },
  };
};
