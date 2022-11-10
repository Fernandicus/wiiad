import { Balance } from "@/src/domain/Balance";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { UniqId } from "@/src/utils/UniqId";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockedReferralRepo";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";

describe(`On UpdateReferral, GIVEN a Referral and a Repo`, () => {
  let newReferral: Referral;
  let mockedRepo: IReferralRepo;
  let updateReferral: UpdateReferral;

  beforeAll(() => {
    newReferral = FakeReferral.create(UniqId.new());
    mockedRepo = mockedReferralRepo([newReferral]);
    updateReferral = new UpdateReferral(mockedRepo);
  });

  it(`WHEN call increaseReferrerBalance, 
  THEN increaseReferrerData should be called with UserId, Balance and a Referrers of 1`, async () => {
    const uId = UniqId.new();
    const balance = new Balance(5);
    await updateReferral.increaseReferrerBalance(uId, balance);
    expect(mockedRepo.increaseReferrerData).toBeCalledWith({
      userId: uId,
      balance: balance,
      counter: ReferralCounter.one(),
    });
  });

  it(`WHEN call increaseRefereeBalance, 
  THEN increaseRefereeData should be called with UserId, Balance and a Referrers of 1`, async () => {
    const uId = UniqId.new();
    const balance = new Balance(5);
    await updateReferral.increaseRefereeBalance(uId, balance);
    expect(mockedRepo.increaseRefereeData).toBeCalledWith({
      userId: uId,
      balance: balance,
      counter: ReferralCounter.one(),
    });
  });
});
