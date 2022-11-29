import { CardDetails } from "../domain/CardDetails";
import { ErrorGettingPaymentDetails } from "../domain/errors/ErrorGettingPaymentDetails";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class GetPaymentDetails {
  constructor(private stripePayment: StripePayments) {}

  async fromPaymentIntent(id: PaymentIntentId): Promise<PaymentDetails> {
    const paymentIntentDetails =
      await this.stripePayment.getPaymentIntentDetails(id);
    if (!paymentIntentDetails)
      throw ErrorGettingPaymentDetails.fromPaymentIntent(id.id);
    return paymentIntentDetails;
  }

  async fromPaymentMethod(id: PaymentMethodId): Promise<CardDetails> {
    const paymentMethodDetails =
      await this.stripePayment.getPaymentMethodDetails(id);
    if (!paymentMethodDetails)
      throw ErrorGettingPaymentDetails.fromPaymentMethod(id.id);
    return paymentMethodDetails;
  }
}
