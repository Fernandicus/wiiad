import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { UniqId } from "@/src/utils/UniqId";

export const mockedReferralRepo = (referrals: Referral[]) : IReferralRepo => {
  return {
    save: jest.fn(),
    increaseReferrerData: jest.fn(),
    increaseRefereeData: jest.fn(),
    findByUserID: jest.fn().mockImplementation((id: UniqId) : Referral | null => {
      const referral = referrals!.find(
        (referral) => referral.userId.id === id.id
      );
      if (!referral) return null;
      return referral;
    }),
  };
};
