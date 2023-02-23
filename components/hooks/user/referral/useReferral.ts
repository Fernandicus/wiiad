import { TReferralState } from "@/context/store";
import { IReferralState } from "@/context/user/referral/referral-reducer";
import { referralSliceActions } from "@/context/user/referral/referral-slice";
import { useDispatch, useSelector } from "react-redux";

interface IUseReferral {
  storeReferral(referral: IReferralState): void;
  totalBalance: number;
  campaignsWatched: number;
  totalReferrers: number;
}

export const useReferral = (): IUseReferral => {
  const { storeReferralData } = referralSliceActions;
  const referral = useSelector((state: TReferralState) => state.referral);
  const dispatch = useDispatch();

  return {
    storeReferral: (referral: IReferralState) =>
      dispatch(storeReferralData(referral)),
    totalBalance: referral.referrerBalance + referral.refereeBalance / 100,
    campaignsWatched: referral.referees,
    totalReferrers: referral.referrers,
  };
};
