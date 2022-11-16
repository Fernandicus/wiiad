import { UniqId } from "@/src/utils/UniqId";
import { TestStripeMongoDBRepo } from "../../../../__mocks__/lib/modules/payment-methods/stripe/infrastructure/TestStripeMongoDBRepo";
import { TestStripeRepository } from "../../../../__mocks__/lib/modules/payment-methods/stripe/domain/TestStripeRepository";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FakeStripe } from "../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

export const setTestStripeDB = async (
  userId: UniqId
): Promise<TestStripeDB> => {
  const testStripeRepo = await TestStripeMongoDBRepo.init();
  return TestStripeDB.setAndInit(testStripeRepo, userId);
};

export class TestStripeDB {
  readonly stripeRepo;

  private constructor(stripeRepo: TestStripeRepository) {
    this.stripeRepo = stripeRepo;
  }

  static async setAndInit(
    stripeRepo: TestStripeRepository,
    userId: UniqId
  ): Promise<TestStripeDB> {
    await stripeRepo.save(this.stripe(userId));
    return new TestStripeDB(stripeRepo);
  }

  private static stripe(userId: UniqId): Stripe {
    return FakeStripe.create(userId);
  }
}
