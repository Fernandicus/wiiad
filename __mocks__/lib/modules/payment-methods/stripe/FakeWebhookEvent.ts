import { IWebHookPaymentSuccess } from "@/pages/api/v1/payments/stripe/campaign/payment-success";
import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeMetadata";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import {
  IStripePayload,
  StripeEventType,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { FakeCardDetails } from "./FakeCardDetails";
import { FakePaymentDetails } from "./FakePaymentDetails";
import { FakePaymentIntentId } from "./FakePaymentIntentId";
import { FakePaymentMethodId } from "./FakePaymentMethodId";

interface ICreatePayloadParams {
  type: StripeEventType;
  paymentDetails: PaymentDetails;
  cardDetails: CardDetails;
  metadata: IStripeMetadata;
}

export class FakeWebhookEvent {
  readonly type;
  readonly data;

  constructor(params: IStripePayload) {
    this.type = params.type;
    this.data = params.data;
  }

  static create({
    type,
    cardDetails,
    metadata,
    paymentDetails,
  }: ICreatePayloadParams): FakeWebhookEvent {
    return new FakeWebhookEvent({
      type,
      data: {
        object: {
          metadata,
          amount: paymentDetails.amount.amount,
          payment_method: paymentDetails.paymentMethodId!.id,
          charges: {
            data: [
              {
                payment_method_details: {
                  card: {
                    brand: cardDetails.brand.brand,
                    exp_month: cardDetails.expMonth.month,
                    exp_year: cardDetails.expYear.year,
                    last4: cardDetails.last4.digits,
                    fingerprint: faker.random.alphaNumeric(10),
                  },
                },
              },
            ],
          },
        },
      },
    });
  }

  static createRandom(type: StripeEventType): FakeWebhookEvent {
    return this.create({
      type,
      cardDetails: FakeCardDetails.create(),
      metadata: {
        adId: UniqId.generate(),
        advertiserId: UniqId.generate(),
      },
      paymentDetails: FakePaymentDetails.create(FakePaymentIntentId.create()),
    });
  }

  static validateSignature(type: string): boolean {
    switch (type as StripeEventType) {
      case "payment_intent.succeeded":
        return true;
      default:
        return false;
    }
  }

  stringify(): string {
    return JSON.stringify({
      type: this.type,
      data: this.data,
    });
  }

  private static getCardDetails(): {
    fingerprint: string;
    exp_month: number;
    exp_year: number;
    brand: string;
    last4: string;
  } {
    const { expMonth, expYear, brand, last4 } =
      FakeCardDetails.create().toPrimitives();
    return {
      fingerprint: faker.random.alphaNumeric(10),
      exp_month: expMonth,
      exp_year: expYear,
      brand,
      last4,
    };
  }
}
