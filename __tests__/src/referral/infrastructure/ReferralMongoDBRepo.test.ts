import { Referral } from "@/src/modules/referrals/domain/Referral";
import { User } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUser } from "../../../../__mocks__/lib/modules/user/FakeUser";
import { setTestReferralDB } from "../../../../__mocks__/lib/infrastructure/db/TestReferralDB";
import { FakeReferral } from "../../../../__mocks__/lib/modules/referral/FakeReferral";
import { Balance } from "@/src/common/domain/Balance";
import { ReferralCounter } from "@/src/modules/referrals/domain/ReferralCounter";
import { ReferralMongoDBRepo } from "@/src/modules/referrals/infrastructure/db/ReferralMongoDBRepo";

describe(`On ReferralMongoDBRepo, GIVEN an User`, () => {
  let user: User;
  let referral: Referral;
  let repo: ReferralMongoDBRepo;
  let increaseData: {
    balance: Balance;
    counter: ReferralCounter;
    userId: UniqId;
  };

  beforeAll(async () => {
    const userTwo = FakeUser.create(UniqId.new());
    user = FakeUser.create(UniqId.new());
    referral = FakeReferral.create(user.id);
    await setTestReferralDB([userTwo.id]);
    repo = new ReferralMongoDBRepo();
    increaseData = {
      balance: new Balance(5),
      counter: ReferralCounter.one(),
      userId: user.id,
    };
  });

  it(`WHEN call save, THEN a new referral must be saved and foundByUserId in MongoDB`, async () => {
    await repo.save(referral);
    const referralFound = await repo.findByUserID(user.id);
    expect(referralFound!).toEqual(referral);
  });

  it(`WHEN call increaseReferrerData, the Referral referrer data must be updated`, async () => {
    await repo.increaseReferrerData(increaseData);

    const referralFound = await repo.findByUserID(user.id);

    const increasedBalance =
      referral.referrerBalance.total + increaseData.balance.total;
    const increasedReferrers =
      referral.referrers.getAmount() + increaseData.counter.getAmount();

    referralFound.match({
      some(value) {
        expect(value.referrerBalance.total).toEqual(increasedBalance);
        expect(value.referrers.getAmount()).toEqual(increasedReferrers);
      },
      nothing() {},
    });
  });

  it(`WHEN call increaseRefereeData, the Referral referee data must be updated`, async () => {
    await repo.increaseRefereeData(increaseData);

    const referralFound = await repo.findByUserID(user.id);

    const increasedBalance =
      referral.refereeBalance.total + increaseData.balance.total;
    const increasedReferrers =
      referral.referees.getAmount() + increaseData.counter.getAmount();

    referralFound.match({
      some(value) {
        expect(value.refereeBalance.total).toEqual(increasedBalance);
        expect(value.referees.getAmount()).toEqual(increasedReferrers);
      },
      nothing() {},
    });
  });
});
