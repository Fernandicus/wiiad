import { Balance } from "@/src/domain/Balance";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { UniqId } from "@/src/utils/UniqId";

describe(`On CreateReferral, GIVEN a Referral and a Repo`, () => {
  let newReferral: Referral;
  let mockedRepo: IReferralRepo;

  beforeAll(() => {
    newReferral = Referral.new({ id: UniqId.new(), userId: UniqId.new() });
    mockedRepo = {
      save: jest.fn(),
      increaseReferrerData: jest.fn(),
      findByUserID: jest.fn(),
      increaseRefereeData: jest.fn(),
    };
  });

  it(`WHEN call create, THEN referral repo should be called with referral params`, async () => {
    const createReferral = new CreateReferral(mockedRepo);
    await createReferral.create(newReferral);
    expect(mockedRepo.save).toBeCalledWith(newReferral.toPrimitives());
  });
});
