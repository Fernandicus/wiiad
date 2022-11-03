import { Balance } from "@/src/domain/Balance";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { UniqId } from "@/src/utils/UniqId";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";

describe(`On UpdateReferral, GIVEN a Referral and a Repo`, () => {
  let newReferral: Referral;
  let mockedRepo: IReferralRepo;

  beforeAll(() => {
    newReferral = FakeReferral.create(UniqId.new());
    mockedRepo = {
      save: jest.fn(),
      increaseReferrerData: jest.fn(),
      findByUserID: jest.fn(),
      increaseRefereeData: jest.fn(),
    };
  });

  it(`WHEN call increaseReferrerBalance, 
  THEN increaseReferrerData should be called with UserId, Balance and a Referrers of 1`, async () => {
    const updateReferral = new UpdateReferral(mockedRepo);
    const uId = UniqId.new();
    const balance = new Balance(5);
    await updateReferral.increaseReferrerBalance(uId, balance);
    expect(mockedRepo.increaseReferrerData).toBeCalledWith({
      userId: uId.id,
      balance: balance.total,
      counter: 1,
    });
  });
});
