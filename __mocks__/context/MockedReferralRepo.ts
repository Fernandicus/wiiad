import { Maybe } from "@/src/common/domain/Maybe";
import { IReferralRepo } from "@/src/modules/referrals/domain/interfaces/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { UniqId } from "@/src/utils/UniqId";

export const mockedReferralRepo = (referrals: Referral[]): IReferralRepo => {
  return {
    save: jest.fn(),
    increaseReferrerData: jest.fn(),
    increaseRefereeData: jest.fn(),
    findByUserID: jest
      .fn()
      .mockImplementation((id: UniqId): Maybe<Referral> => {
        const referral = referrals!.find(
          (referral) => referral.userId.id === id.id
        );
        if (!referral) return Maybe.nothing();
        return Maybe.some(referral);
      }),
  };
};
