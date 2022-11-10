import { Referral } from "@/src/modules/referrals/domain/Referral";
import { UniqId } from "@/src/utils/UniqId";
import { FakeReferral } from "../../modules/referral/FakeReferral";
import { TestReferralMongoDBRepo } from "../../modules/referral/infrastructure/TestReferralMongoDBRepo";
import { TestReferralRepo } from "../../modules/referral/domain/TestReferralRepo";

export const setTestReferralDB = async (
  usersId: UniqId[]
): Promise<TestReferralDB> => {
  const testReferralRepo = await TestReferralMongoDBRepo.init();
  return TestReferralDB.setAndInit(testReferralRepo, usersId);
};

export class TestReferralDB {
  readonly referralRepo;

  private constructor(referralRepo: TestReferralRepo) {
    this.referralRepo = referralRepo;
  }

  static async setAndInit(
    referralRepo: TestReferralRepo,
    usersId: UniqId[]
  ): Promise<TestReferralDB> {
    const referrals = this.createMany(usersId);
    await referralRepo.saveMany(referrals);
    return new TestReferralDB(referralRepo);
  }

  async getAll(): Promise<Referral[] | null> {
    const referrals = await this.referralRepo.getAll();
    return referrals;
  }

  private static createMany(userId: UniqId[]): Referral[] {
    const referrals = userId.map((id): Referral => {
      return FakeReferral.create(id);
    });
    return referrals;
  }
}
