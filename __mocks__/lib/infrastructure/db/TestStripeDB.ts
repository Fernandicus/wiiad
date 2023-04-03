import { UniqId } from "@/src/common/domain/UniqId";
import { TestStripeMongoDBRepo } from "../../../../__mocks__/lib/modules/payment-methods/stripe/infrastructure/TestStripeMongoDBRepo";
import { TestStripeRepository } from "../../../../__mocks__/lib/modules/payment-methods/stripe/domain/TestStripeRepository";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FakeStripe } from "../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

export const setTestStripeDB = async (
  userIds: UniqId[]
): Promise<TestStripeDB> => {
  const testStripeRepo = await TestStripeMongoDBRepo.init();
  return TestStripeDB.setAndInit(testStripeRepo, userIds);
};

export class TestStripeDB {
  private constructor(private stripeRepo: TestStripeRepository) {}

  static async setAndInit(
    stripeRepo: TestStripeRepository,
    userIds: UniqId[]
  ): Promise<TestStripeDB> {
    await stripeRepo.saveMany(this.stripe(userIds));
    return new TestStripeDB(stripeRepo);
  }

  async getByUserId(userId: UniqId): Promise<Stripe | null> {
    return await this.stripeRepo.getByUserId(userId);
  }

  async getAll(): Promise<Stripe[] | null> {
    return await this.stripeRepo.getAllUsers();
  }

  private static stripe(userId: UniqId[]): Stripe[] {
    return FakeStripe.createMany(userId);
  }
}
