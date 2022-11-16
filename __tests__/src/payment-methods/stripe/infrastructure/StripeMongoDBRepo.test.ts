import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { StripeMongoDBRepo } from "@/src/modules/payment-methods/stripe/infrastructure/StripeMongoDBRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";
import { TestStripeMongoDBRepo } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/infrastructure/TestStripeMongoDBRepo";

describe("On StripeMongoDBRepo, GIVEN a StripeMongoDB repo", () => {
  let repo: StripeMongoDBRepo;
  let stripe: Stripe;

  beforeAll(async () => {
    await TestStripeMongoDBRepo.init();
    repo = new StripeMongoDBRepo();
    stripe = FakeStripe.create(UniqId.new());
  });

  it(`WHEN call save method, THEN stripe should be saved and found in DB`, async () => {
    await repo.save(stripe);
    const stripeFound = await repo.findByUserId(stripe.userId);
    expect(stripeFound).toEqual(stripe);
  });
});
