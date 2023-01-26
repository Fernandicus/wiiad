import { getAdvertiserProfileDataHandler } from "@/components/src/modules/advertiser/data-profile/infrastructure/advertiser-container";
import { RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { TAdvertiserStatusState } from "context/advertisers/modules/status/domain/interfaces/IAdvertiserState";
import { useAds } from "./modules/ads/useAds";
import { useCampaigns } from "./modules/campaigns/useCampaigns";
import { useUserStripe } from "./modules/payments/stripe/useUserStripe";
import { useAdvertiserState } from "./modules/state/useAdvertiserState";

interface IUseAdvertiser {
  status: TAdvertiserStatusState;
  initStore(session: IUserPrimitives): Promise<void>;
  session: IUserPrimitives;
}

export const useAdvertiser = (): IUseAdvertiser => {
  const { storeCampaigns } = useCampaigns();
  const { storeAds } = useAds();
  const { storeStripe } = useUserStripe();
  const { status, changeStatus, storeSession, session } = useAdvertiserState();

  const storeProfile = async () => {
    const profileData = await getAdvertiserProfileDataHandler.getAll();
    storeCampaigns(profileData.campaigns);
    storeAds(profileData.ads);
    if (profileData.stripeCustomer) storeStripe(profileData.stripeCustomer);
  };

  const initStore = async (session: IUserPrimitives): Promise<void> => {
    if (session.role === RoleType.USER || status === "init") return;
    try {
      storeSession(session);
      await storeProfile();
      changeStatus("init");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    initStore,
    status,
    session,
  };
};
