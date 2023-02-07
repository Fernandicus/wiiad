import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class DetachStripePM {
  constructor(private stripePayments: StripePayments) {}

  async detach(paymentMethod: PaymentMethodId): Promise<void> {
    await this.stripePayments.detachPaymentMethod(paymentMethod);
  }
}
