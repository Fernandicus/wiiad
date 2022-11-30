import { CustomerId } from "../domain/value-objects/CustomerId";
import { IStripeMetadata } from "../domain/interfaces/IStripeMetadata";
import { PaymentAmount } from "../domain/value-objects/PaymentAmount";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { PaymentStatus } from "../domain/value-objects/PaymentStatus";
import { StripePayments } from "../infrastructure/StripePayments";
import { ErrorPaymentIntent } from "../domain/errors/ErrorPaymentIntent";

export class PaymentIntent {
  constructor(private stripe: StripePayments) {}

  async withoutPaymentMethod(
    customerId: CustomerId,
    amount: PaymentAmount,
    metadata?: IStripeMetadata
  ): Promise<PaymentDetails> {
    const details = await this.stripe.paymentIntentWithoutPaymentMethod({
      customerId,
      amount,
      metadata,
    });
    if (!details) throw ErrorPaymentIntent.fail();
    return details;
  }

  async withPaymentMethod(
    customerId: CustomerId,
    amount: PaymentAmount,
    paymentMethod: PaymentMethodId,
    metadata?: IStripeMetadata
  ): Promise<PaymentDetails> {
    const details = await this.stripe.paymentIntentWithPaymentMethod({
      customerId,
      amount,
      paymentMethod,
      metadata,
    });
    if (!details) throw ErrorPaymentIntent.fail();
    return details;
  }

  async confirm(id: PaymentIntentId): Promise<void> {
    const status = await this.stripe.confirmPaymentIntent(id);
    if (status === PaymentStatus.Error)
      throw ErrorPaymentIntent.confirmationFail();
  }
}
