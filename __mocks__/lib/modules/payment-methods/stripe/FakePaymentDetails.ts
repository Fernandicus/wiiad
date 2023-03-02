import {
  IPaymentDetailsParams,
  PaymentDetails,
} from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentIntentId";
import { FakePaymentMethodId } from "./FakePaymentMethodId";
import { FakePricePerClick } from "./FakePricePerClick";
import { FakeStripeClientSecret } from "./FakeStripeClientSecret";

export class FakePaymentDetails extends PaymentDetails {
  constructor(params: IPaymentDetailsParams) {
    super(params);
  }

  static createWithRandomPaymentDetails(
    id: PaymentIntentId
  ): FakePaymentDetails {
    const amount = FakePricePerClick.selectRandomFromList();
    return new FakePaymentDetails({
      id,
      amount: new PaymentAmount(amount.selectedAmount),
      clientSecret: FakeStripeClientSecret.create(),
      paymentMethodId: FakePaymentMethodId.create(),
    });
  }

  static create(params: {
    id: PaymentIntentId;
    ppc: FakePricePerClick;
  }): FakePaymentDetails {
    const { id, ppc } = params;
    return new FakePaymentDetails({
      id,
      amount: new PaymentAmount(ppc.selectedAmount),
      clientSecret: FakeStripeClientSecret.create(),
      paymentMethodId: FakePaymentMethodId.create(),
    });
  }
}
