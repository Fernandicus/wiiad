import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { User } from "@/src/modules/user/domain/User";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockReferralTestDB";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe(`On FindReferral, GIVEN a User id and some Referrals in MongoDB`, () => {
  let referrals: IReferralPrimitives[];
  let findReferral: FindReferral;
  let user: User;
  let mockedRepo: IReferralRepo;

  beforeAll(async () => {
    const users = FakeUser.createMany(5);
    user = users[0];
    const ids = users.map((user) => user.id.id);
    await mockedReferralRepo(ids);
    mockedRepo = {
      save: jest.fn(),
      increaseReferrerData: jest.fn(),
      findByUserID: jest.fn(),
      increaseRefereeData: jest.fn(),
    };
    findReferral = new FindReferral(mockedRepo);
  });

  it(`WHEN call findByUserId, THEN repo findByUserID should be called with user id`, async () => {
    await findReferral.findByUserId(user.id);
    expect(mockedRepo.findByUserID).toBeCalledWith(user.id.id);
  });
});
