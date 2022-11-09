import { IReferralPrimitives, Referral } from "@/src/modules/referrals/domain/Referral";
import { UniqId } from "@/src/utils/UniqId";
import { TestReferralRepo } from "../lib/modules/referral/domain/TestReferralRepo";
import { FakeReferral } from "../lib/modules/referral/FakeReferral";
import { TestReferralMongoDBRepo } from "../lib/modules/referral/infrastructure/TestReferralMongoDBRepo";

export const mockedReferralRepo = async (
  usersId: UniqId[]
): Promise<MockReferralTestDB> => {
  const testReferralRepo = await TestReferralMongoDBRepo.init();
  return MockReferralTestDB.setAndInit(testReferralRepo, usersId);
};

export class MockReferralTestDB {
  readonly referralRepo;

  private constructor(referralRepo: TestReferralRepo) {
    this.referralRepo = referralRepo;
  }

  static async setAndInit(
    referralRepo: TestReferralRepo,
    usersId: UniqId[]
  ): Promise<MockReferralTestDB> {
    const referrals = this.createMany(usersId);
    await referralRepo.saveMany(referrals);
    return new MockReferralTestDB(referralRepo);
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
