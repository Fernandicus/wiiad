import { getReferralDataHandler } from "@/components/src/user/infrastructure/referral-container";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { IUseSession } from "../interfaces/UserTypes";
import { useSession } from "../useSession";
import { useReferral } from "./referral/useReferral";

export const useUser = (): IUseSession => {
  const { storeReferral } = useReferral();

  const storeProfileData = async () => {
    const referralData = await getReferralDataHandler.get();
    const campaignsWatched = referralData.referees;

    storeReferral({
      refereeBalance: referralData.refereeBalance,
      referees: campaignsWatched,
      referrerBalance: referralData.referrerBalance,
      referrers: referralData.referrers,
    });
  };

  const { initStore, session, status } = useSession({
    onStoreProfileData: storeProfileData,
  });

  return { initStore, session, status };
};
