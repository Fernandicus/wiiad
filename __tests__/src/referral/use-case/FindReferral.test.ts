import { ErrorFindingReferral } from "@/src/modules/referrals/domain/ErrorFindingReferral";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { User } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockedReferralRepo";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe(`On FindReferral, GIVEN a User id and some Referrals in MongoDB`, () => {
  let findReferral: FindReferral;
  let user: User;
  let mockedRepo: IReferralRepo;

  beforeAll(async () => {
    const users = FakeUser.createMany(5);
    const ids = users.map((user) => user.id);
    const referrals = FakeReferral.createMany(ids);
    user = users[0];
    mockedRepo = mockedReferralRepo(referrals);
    findReferral = new FindReferral(mockedRepo);
  });

  it(`WHEN call findByUserId, THEN repo findByUserID should be called with user id`, async () => {
    const referralFound = await findReferral.findByUserId(user.id);
    expect(mockedRepo.findByUserID).toBeCalledWith(user.id);
    expect(referralFound.userId).toEqual(user.id);
  });

  it(`WHEN call findByUserId for a non existing userId, THEN an ErrorFindingReferral should be thrown`, async () => {
    expect(findReferral.findByUserId(UniqId.new())).rejects.toThrowError(
      ErrorFindingReferral
    );
  });
});
