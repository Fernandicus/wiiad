import {
  CardDetails,
  ICardDetailsParams,
  ICardDetailsPrimitives,
} from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { faker } from "@faker-js/faker";

export class FakeCardDetails extends CardDetails {
  constructor(params: ICardDetailsParams) {
    super(params);
  }

  static create(): CardDetails {
    const { brand, expMonth, expYear, last4, paymentMethodId } =
      this.generateRandom();

    const cardDetails = new CardDetails({
      brand: new CardBrand(brand),
      last4: new Last4(last4),
      expMonth: new ExpMonth(expMonth),
      expYear: new ExpYear(expYear),
      paymentMethodId: new PaymentMethodId(paymentMethodId),
    });

    return cardDetails;
  }

  static withGivenPaymentId(id: PaymentMethodId): CardDetails {
    const { brand, expMonth, expYear, last4 } = this.generateRandom();

    const cardDetails = new CardDetails({
      paymentMethodId: id,
      brand: new CardBrand(brand),
      last4: new Last4(last4),
      expMonth: new ExpMonth(expMonth),
      expYear: new ExpYear(expYear),
    });

    return cardDetails;
  }

  private static generateRandom(): ICardDetailsPrimitives {
    const expYear = new Date(Date.now()).getFullYear() + 4;
    const expMonth = Math.round(Math.random() * 11);
    const last4 = faker.random.numeric(4)
    const paymentMethodId = "pm_" + faker.random.numeric(7);

    return {
      brand: "visa",
      expMonth,
      expYear,
      last4,
      paymentMethodId,
    };
  }
}
