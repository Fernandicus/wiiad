import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/data-profile/infrastructure/advertiser-container";
import { IAdvertiserDataPrimitives } from "@/src/common/domain/interfaces/IAdvertiserData";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserStatusAction";
import { store } from "context/common/infrastructure/store";
import { useAds } from "./modules/ads/useAds";
import { IUseCampaigns, useCampaigns } from "./modules/campaigns/useCampaigns";
import { useUserStripe } from "./modules/payments/stripe/useUserStripe";
import { useAdvertiserState } from "./modules/state/useAdvertiserState";

interface IUseAdvertiser extends IUseCampaigns {
  status: TAdvertiserStatusState;
  initStore(session: IUserPrimitives): Promise<void>;
  ads: AdPropsPrimitives[];
  createAd(ad: AdPropsPrimitives): Promise<void>;
  storeAds(ads: AdPropsPrimitives[]): void;
  userStripe: IStripePrimitives;
  session: IUserPrimitives;
}

export const useAdvertiser = (): IUseAdvertiser => {
  const { campaigns, storeCampaigns } = useCampaigns();
  const { ads, storeAds, createAd } = useAds();
  const { initStripeStore, userStripe } = useUserStripe();
  const { status, changeStatus, storeSession, session } = useAdvertiserState();

  const storeProfile = async () => {
    const profileData = await getAdvertiserProfileDataHandler.getAll();
    storeCampaigns(profileData.campaigns);
    storeAds(profileData.ads);
    if (profileData.stripeCustomer) initStripeStore(profileData.stripeCustomer);
  };

  const initStore = async (session: IUserPrimitives): Promise<void> => {
    if (status === "init") return;
    try {
      storeSession(session);
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
    createAd,
    userStripe,
    session,
    storeCampaigns: (newCampaigns: ICampaignPrimitives[]) => {
      storeCampaigns(newCampaigns);
      changeNonInitStatus();
    },
    storeAds: (newAds: AdPropsPrimitives[]) => {
      storeAds(newAds);
      changeNonInitStatus();
    },
  };
};
