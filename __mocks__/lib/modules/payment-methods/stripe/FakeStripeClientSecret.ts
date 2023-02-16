import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";

export class FakeStripeClientSecret extends StripeClientSecret {
  constructor(readonly secret: string) {
    super(secret);
  }

  static create(): StripeClientSecret {
    return new StripeClientSecret("_secret_");
  }
}
