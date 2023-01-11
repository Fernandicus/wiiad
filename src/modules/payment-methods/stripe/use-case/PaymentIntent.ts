import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/value-objects/PaymentIntentId";
import { PaymentStatus } from "../domain/value-objects/PaymentStatus";
import {
  IPaymentWithoutPaymentMethod,
  IPaymentWithPaymentMethod,
  StripePayments,
} from "../infrastructure/StripePayments";
import { ErrorPaymentIntent } from "../domain/errors/ErrorPaymentIntent";

export class PaymentIntent {
  constructor(private stripe: StripePayments) {}

  async withoutPaymentMethod(
    params: IPaymentWithoutPaymentMethod
  ): Promise<PaymentDetails> {
    console.log(params);
    const details = await this.stripe.paymentIntentWithoutPaymentMethod(params);
    if (!details) throw ErrorPaymentIntent.fail();
    return details;
  }

  async withPaymentMethod(
    params: IPaymentWithPaymentMethod
  ): Promise<PaymentDetails> {
    const details = await this.stripe.paymentIntentWithPaymentMethod(params);
    if (!details) throw ErrorPaymentIntent.fail();
    return details;
  }

  async confirm(id: PaymentIntentId): Promise<void> {
    const status = await this.stripe.confirmPaymentIntent(id);
    if (status === PaymentStatus.Error)
      throw ErrorPaymentIntent.confirmationFail();
  }
}
