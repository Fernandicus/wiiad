import {
  IReferralPrimitives,
  Referral,
} from "@/src/modules/referrals/domain/Referral";
import { ReferralMongoDBRepo } from "@/src/modules/referrals/infrastructure/ReferralMongoDBRepo";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";
import { TestReferralMongoDBRepo } from "../../../../__mocks__/lib/modules/referral/infrastructure/TestReferralMongoDBRepo";
import { mockedReferralRepo } from "../../../../__mocks__/context/MockReferralTestDB";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";

describe(`On ReferralMongoDBRepo, GIVEN an User`, () => {
  let user: IUserPrimitives;
  let repo: ReferralMongoDBRepo;
  let referral: Referral;

  beforeAll(async () => {
    user = FakeUser.createWithPrimitives(UniqId.generate());
    const userTwo = FakeUser.createWithPrimitives(UniqId.generate());
    referral = FakeReferral.create(new UniqId(user.id));
    await mockedReferralRepo([userTwo.id]);
    repo = new ReferralMongoDBRepo();
  });

  it(`WHEN call save, new Referral must be saved in MongoDB`, async () => {
    await repo.save(referral.toPrimitives());
    const referralFound = await repo.findByUserID(user.id);
    expect(referralFound!).toEqual(referral.toPrimitives());
  });

  it(`WHEN call increaseReferrerData, the Referral referrer data must be updated`, async () => {
    const increaseData = {
      balance: 5,
      counter: 1,
      userId: user.id,
    };

    await repo.increaseReferrerData(increaseData);

    const referralFound = await repo.findByUserID(user.id);
    const updatedReferral: IReferralPrimitives = {
      id: referral.id.id,
      userId: referral.userId.id,
      referees: referralFound!.referees,
      refereeBalance: referralFound!.refereeBalance,
      referrers: referral.referrers.amount + increaseData.counter,
      referrerBalance: referral.referrerBalance.total + increaseData.balance,
    };

    expect(referralFound).toEqual(updatedReferral);
  });

  it(`WHEN call increaseRefereeData, the Referral referee data must be updated`, async () => {
    const increaseData = {
      balance: 5,
      counter: 1,
      userId: user.id,
    };

    await repo.increaseRefereeData(increaseData);

    const referralFound = await repo.findByUserID(user.id);

    const updatedReferral: IReferralPrimitives = {
      id: referral.id.id,
      referrers: referralFound!.referrers,
      referrerBalance: referralFound!.referrerBalance,
      userId: referral.userId.id,
      referees: referral.referees.amount + increaseData.counter,
      refereeBalance: referral.refereeBalance.total + increaseData.balance,
    };

    expect(referralFound).toEqual(updatedReferral);
  });
});
