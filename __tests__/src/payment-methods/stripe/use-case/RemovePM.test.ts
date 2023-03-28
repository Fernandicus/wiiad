import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { RemovePM } from "@/src/modules/payment-methods/stripe/use-case/RemovePM";
import { SaveStripe } from "@/src/modules/payment-methods/stripe/use-case/SaveStripe";
import { UniqId } from "@/src/common/domain/UniqId";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

describe("On RemovePM, GIVEN a stripe mocked repo", () => {
  let removePM: RemovePM;
  let stripe: Stripe;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedRepo = mockedStripeRepo();
    removePM = new RemovePM(mockedRepo);
  });

  it(`WHEN call remove method, THEN repo should be called with payment method id and user id`, async () => {
    const pm = stripe.paymentMethods[0];
    const params = { pm: pm.paymentMethodId, userId: stripe.userId };
    await removePM.remove(params);
    expect(mockedRepo.removePM).toBeCalledWith(params);
  });
});
