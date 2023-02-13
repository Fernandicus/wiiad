import { getAdvertiserProfileDataHandler } from "@/components/src/advertiser/data-profile/infrastructure/advertiser-container";
import { TAdvertiserStatusState } from "@/context/advertisers/status/session-reducer";
import { RoleType } from "@/src/common/domain/Role";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { useAds } from "./ads/useAds";
import { useCampaigns } from "./campaigns/useCampaigns";
import { useUserStripe } from "./payments/stripe/useUserStripe";
import { useAdvertiserState } from "./state/useAdvertiserState";

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
