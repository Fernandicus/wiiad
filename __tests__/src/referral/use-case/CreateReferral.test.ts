import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { UniqId } from "@/src/utils/UniqId";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";

describe(`On CreateReferral, GIVEN a Referral and a Repo`, () => {
  let newReferral: Referral;
  let mockedRepo: IReferralRepo;
  let createReferral: CreateReferral;

  beforeAll(() => {
    newReferral = FakeReferral.create(UniqId.new());
    mockedRepo = {
      save: jest.fn(),
      increaseReferrerData: jest.fn(),
      findByUserID: jest.fn(),
      increaseRefereeData: jest.fn(),
    };
    createReferral = new CreateReferral(mockedRepo);
  });

  it(`WHEN call create, THEN referral repo should be called with referral params`, async () => {
    await createReferral.create(newReferral);
    expect(mockedRepo.save).toBeCalledWith(newReferral);
  });
});
