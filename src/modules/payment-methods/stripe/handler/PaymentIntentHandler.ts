import { CustomerId } from "../domain/CustomerId";
import { IStripeMetadata } from "../domain/IStripeMetadata";
import { PaymentAmount } from "../domain/PaymentAmount";
import {
  IPaymentDetailsPrimitives,
  PaymentDetails,
} from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { PaymentIntent } from "../use-case/PaymentIntent";

export class PaymentIntentHandler {
  constructor(private paymentIntent: PaymentIntent) {}

  async withoutPaymentMethod(
    customerId: string,
    amount: number,
    metadata?: IStripeMetadata,
  ): Promise<IPaymentDetailsPrimitives> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const details = await this.paymentIntent.withoutPaymentMethod(
      customer,
      totalAmount,
      metadata,
    );
    return details.toPrimitives();
  }

  async withPaymentMethod(
    customerId: string,
    amount: number,
    paymentMethodId: string,
    metadata?: IStripeMetadata,
  ): Promise<IPaymentDetailsPrimitives> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const methodId = new PaymentMethodId(paymentMethodId);

    const details = await this.paymentIntent.withPaymentMethod(
      customer,
      totalAmount,
      methodId,
      metadata,
    );
    return details.toPrimitives();
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<void> {
    const pi_ID = new PaymentIntentId(paymentIntentId);
    await this.paymentIntent.confirm(pi_ID);
  }
}
