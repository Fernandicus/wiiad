import { ErrorCreatingPayment } from "@/src/domain/ErrorCreatingPayment";
import { CustomerId } from "../domain/CustomerId";
import { IStripeMetadata } from "../domain/IStripeMetadata";
import { PaymentAmount } from "../domain/PaymentAmount";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { PaymentStatus } from "../domain/PaymentStatus";
import { StripePayments } from "../infrastructure/StripePayments";

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
    if (!details) throw new ErrorCreatingPayment("Payment intent has failed");
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
      metadata
    });
    if (!details) throw new ErrorCreatingPayment("Payment intent has failed");
    return details;
  }

  async confirm(id: PaymentIntentId): Promise<void> {
    const status = await this.stripe.confirmPaymentIntent(id);
    if (status === PaymentStatus.Error)
      throw new ErrorCreatingPayment("Payment confirmation error");
  }
}
