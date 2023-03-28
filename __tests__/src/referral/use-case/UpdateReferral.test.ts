import { Balance } from "@/src/common/domain/Balance";
import { IReferralRepo } from "@/src/modules/referrals/domain/interfaces/IReferralRepo";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { UniqId } from "@/src/common/domain/UniqId";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockedReferralRepo";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";
import { AnonymReferenceId } from "@/src/common/domain/AnonymReferenceId";

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
  THEN increaseReferrerData should be called with UserId, Balance and a Referrers of zero`, async () => {
    const referrerId = ReferrerId.new();
    const balance = new Balance(5);

    await updateReferral.increaseReferrerBalance(referrerId, balance);

    expect(mockedRepo.increaseReferrerData).toBeCalledWith({
      referrerId: referrerId,
      balance: balance,
      counter: ReferralCounter.zero(),
    });
  });

  it.only(`WHEN call increaseRefereeBalance, 
  THEN increaseRefereeData should be called with UserId, Balance and a Referrers of zero`, async () => {
    const refereeId = RefereeId.new();
    const anonymousReferee = new AnonymReferenceId(refereeId);
    const balance = new Balance(5);

    await updateReferral.increaseRefereeBalance(anonymousReferee, balance);

    expect(mockedRepo.increaseRefereeData).toBeCalledWith({
      refereeId: anonymousReferee,
      balance: balance,
      counter: ReferralCounter.zero(),
    });
  });
});
