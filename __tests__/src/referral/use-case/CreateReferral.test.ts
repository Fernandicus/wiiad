import { IReferralRepo } from "@/src/modules/referrals/domain/interfaces/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { UniqId } from "@/src/utils/UniqId";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockedReferralRepo";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";

describe(`On CreateReferral, GIVEN a Referral and a Repo`, () => {
  let mockedRepo: IReferralRepo;
  let createReferral: CreateReferral;

  beforeAll(() => {
    const newReferral = FakeReferral.create(UniqId.new());
    mockedRepo = mockedReferralRepo([newReferral]);
    createReferral = new CreateReferral(mockedRepo);
  });

  it(`WHEN call new, THEN referral repo should be called with referral params`, async () => {
    const userId = UniqId.new();
    const referralId = UniqId.new();

    await createReferral.new({
      id: referralId,
      userId,
    });
    
    const newReferral = Referral.empty({ userId, id: referralId });
    expect(mockedRepo.save).toBeCalledWith(newReferral);
  });
});
