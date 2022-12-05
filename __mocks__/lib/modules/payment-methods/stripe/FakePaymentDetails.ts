import {
  CardDetails,
  ICardDetailsParams,
  ICardDetailsPrimitives,
} from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import {
  IPaymentDetailsParams,
  PaymentDetails,
} from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { PaymentIntent } from "@/src/modules/payment-methods/stripe/use-case/PaymentIntent";
import { faker } from "@faker-js/faker";
import { FakePaymentMethodId } from "./FakePaymentMethodId";

export class FakePaymentDetails extends PaymentDetails {
  constructor(params: IPaymentDetailsParams) {
    super(params);
  }

  static create(id: PaymentIntentId): FakePaymentDetails {
    const amount = parseInt(faker.random.numeric(5000));
    return new FakePaymentDetails({
      id,
      amount: new PaymentAmount(amount),
      clientSecret: faker.random.numeric(1000),
      paymentMethodId: FakePaymentMethodId.create(),
    });
  }
}
