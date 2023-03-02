import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { StripeMongoDBRepo } from "@/src/modules/payment-methods/stripe/infrastructure/db/StripeMongoDBRepo";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCardDetails } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";
import { TestStripeMongoDBRepo } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/infrastructure/TestStripeMongoDBRepo";

describe("On StripeMongoDBRepo, GIVEN a StripeMongoDB repo", () => {
  let repo: StripeMongoDBRepo;
  let stripe: Stripe;
  let cardDetails: CardDetails;

  beforeAll(async () => {
    await TestStripeMongoDBRepo.init();
    repo = new StripeMongoDBRepo();
    stripe = FakeStripe.create(UniqId.new());
    cardDetails = FakeCardDetails.create();
  });

  it(`WHEN call save method, THEN stripe should be saved and found in DB`, async () => {
    await repo.save(stripe);
    const stripeFound = await repo.findByUserId(stripe.userId);
    expect(stripeFound).toEqual(stripe);
  });

  it(`WHEN call save method, THEN stripe should be saved and found in DB`, async () => {
    await repo.addNewCardDetails({
      userId: stripe.userId,
      cardDetails,
    });
    const stripeFound = await repo.findByUserId(stripe.userId);
    expect(stripeFound?.paymentMethods).toContainEqual(cardDetails);
  });
});
