import { ErrorFindingReferral } from "@/src/modules/referrals/domain/ErrorFindingReferral";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { User } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";

describe(`On FindReferral, GIVEN a User id and some Referrals in MongoDB`, () => {
  let referrals: Referral[];
  let findReferral: FindReferral;
  let user: User;
  let mockedRepo: IReferralRepo;

  beforeAll(async () => {
    const users = FakeUser.createMany(5);
    const ids = users.map((user) => user.id);
    user = users[0];
    referrals = FakeReferral.createMany(ids);
    mockedRepo = {
      save: jest.fn(),
      increaseReferrerData: jest.fn(),
      findByUserID: jest.fn().mockImplementation((id: UniqId) => {
        const referral = referrals!.find(
          (referral) => referral.userId.id === id.id
        );
        if (!referral) return null;
        return referral;
      }),
      increaseRefereeData: jest.fn(),
    };
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
