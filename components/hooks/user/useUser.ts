import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { IUseSession } from "../interfaces/UserTypes";
import { useSession } from "../useSession";
import { useReferral } from "./referral/useReferral";

export const useUser = (): IUseSession => {
  const { storeReferral } = useReferral();

  const storeProfileData = async () => {
    await fetch(ApiRoutes.getUserReferralData).then(async (resp) => {
      if (resp.status === 200) {
        const respJSON = await resp.json();
        const referrers = respJSON["referral"]["referrers"];
        const referrerBalance = respJSON["referral"]["referrerBalance"];
        const refereeBalance = respJSON["referral"]["refereeBalance"];
        const total = referrerBalance + refereeBalance;
        const campaignsWatched = respJSON["referral"]["referees"];

        storeReferral({
          refereeBalance,
          referees: campaignsWatched,
          referrerBalance,
          referrers,
        });
      }
    });
  };

  const { initStore, session, status } = useSession({
    onStoreProfileData: storeProfileData,
  });

  return { initStore, session, status };
};
