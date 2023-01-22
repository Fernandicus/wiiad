import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/infrastructure/advertiser-container";
import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusState";
import { store } from "context/common/infrastructure/store";
import { useAds } from "./modules/ads/useAds";
import { useCampaigns } from "./modules/campaigns/useCampaigns";
import { useUserStripe } from "./modules/payments/stripe/useUserStripe";
import { useAdvertiserStatus } from "./modules/state/useAdvertiserStatus";

interface IUseAdvertiser {
  status: TAdvertiserStatusState;
  initStore(): Promise<void>;
  campaigns: ICampaignPrimitives[];
  saveCampaigns(campaigns: ICampaignPrimitives[]): void;
  ads: AdPropsPrimitives[];
  saveAds(ads: AdPropsPrimitives[]): void;
  userStripe: IStripePrimitives;
}

export const useAdvertiser = (): IUseAdvertiser => {
  const { campaigns, storeCampaigns } = useCampaigns();
  const { ads, storeAds } = useAds();
  const { initStripeStore, userStripe } = useUserStripe();
  const { status, changeStatus } = useAdvertiserStatus();

  const storeProfile = async () => {
    const profileData = await getAdvertiserProfileDataHandler.getAll();
    storeCampaigns(profileData.campaigns);
    storeAds(profileData.ads);
    if (profileData.stripeCustomer) initStripeStore(profileData.stripeCustomer);
  };

  const initStore = async (): Promise<void> => {
    if (status === "init") return;
    try {
      await storeProfile();
      changeStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  function changeNonInitStatus() {
    if (status === "non-init") changeStatus("init");
  }

  return {
    initStore,
    status,
    campaigns,
    ads,
    userStripe,
    saveCampaigns: (newCampaigns: ICampaignPrimitives[]) => {
      storeCampaigns(newCampaigns);
      changeNonInitStatus();
    },
    saveAds: (newAds: AdPropsPrimitives[]) => {
      storeAds(newAds);
      changeNonInitStatus();
    },
  };
};
