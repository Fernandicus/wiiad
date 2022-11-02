import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { UniqId } from "@/src/utils/UniqId";
import { TestReferralRepo } from "../lib/modules/referral/domain/TestReferralRepo";
import { FakeReferral } from "../lib/modules/referral/FakeReferral";
import { TestReferralMongoDBRepo } from "../lib/modules/referral/infrastructure/TestReferralMongoDBRepo";

export const mockedReferralRepo = async (
  usersId: string[]
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
    usersId: string[]
  ): Promise<MockReferralTestDB> {
    const referrals = this.createMany(usersId);
    await referralRepo.saveMany(referrals);
    return new MockReferralTestDB(referralRepo);
  }

  async getAll(): Promise<IReferralPrimitives[] | null> {
    const referrals = await this.referralRepo.getAll();
    return referrals;
  }

  private static createMany(userId: string[]): IReferralPrimitives[] {
    const referrals = userId.map((id): IReferralPrimitives => {
      return FakeReferral.createWithPrimitives(id);
    });
    return referrals;
  }
}
