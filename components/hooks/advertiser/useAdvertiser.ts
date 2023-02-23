import { getAdvertiserProfileDataHandler } from "@/components/src/advertiser/data-profile/infrastructure/advertiser-container";
import { IUseSession } from "../interfaces/UserTypes";
import { useSession } from "../useSession";
import { useAds } from "./ads/useAds";
import { useCampaigns } from "./campaigns/useCampaigns";
import { useUserStripe } from "./payments/stripe/useUserStripe";

export const useAdvertiser = (): IUseSession => {
  const { storeCampaigns } = useCampaigns();
  const { storeAds } = useAds();
  const { storeStripe } = useUserStripe();

  const storeProfile = async () => {
    const profileData = await getAdvertiserProfileDataHandler.getAll();
    storeCampaigns(profileData.campaigns);
    storeAds(profileData.ads);
    if (profileData.stripeCustomer) storeStripe(profileData.stripeCustomer);
  };

  const profile = useSession({ onStoreProfileData: storeProfile });

  return profile;
};
