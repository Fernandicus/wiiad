import { Balance } from "@/src/domain/Balance";
import { IReferralRepo } from "@/src/modules/referrals/domain/IReferralRepo";
import {
  IReferralPrimitives,
  Referral,
} from "@/src/modules/referrals/domain/Referral";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { CreateReferral } from "@/src/modules/referrals/use-case/CreateReferral";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { User } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import {
  mockedReferralRepo,
  MockReferralTestDB,
} from "../../../../__mocks__/context/MockReferralTestDB";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";
import { TestReferralMongoDBRepo } from "../../../../__mocks__/lib/modules/referral/infrastructure/TestReferralMongoDBRepo";
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
