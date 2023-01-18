import { CustomerId } from "../../domain/value-objects/CustomerId";
import { IStripeMetadata } from "../../domain/interfaces/IStripeMetadata";
import { PaymentAmount } from "../../domain/value-objects/PaymentAmount";
import { IPaymentDetailsPrimitives } from "../../domain/PaymentDetails";
import { PaymentIntentId } from "../../domain/value-objects/PaymentIntentId";
import { PaymentMethodId } from "../../domain/value-objects/PaymentMethodId";
import { PaymentIntent } from "../PaymentIntent";

export class PaymentIntentHandler {
  constructor(private paymentIntent: PaymentIntent) {}

  async withoutPaymentMethod(
    customerId: string,
    amount: number,
    metadata?: IStripeMetadata
  ): Promise<IPaymentDetailsPrimitives> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const details = await this.paymentIntent.withoutPaymentMethod({
      customerId: customer,
      amount: totalAmount,
      metadata,
    });
    return details.toPrimitives();
  }

  async withPaymentMethod(
    customerId: string,
    amount: number,
    paymentMethodId: string,
    metadata?: IStripeMetadata
  ): Promise<IPaymentDetailsPrimitives> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const methodId = new PaymentMethodId(paymentMethodId);

    const details = await this.paymentIntent.withPaymentMethod({
      customerId: customer,
      amount: totalAmount,
      paymentMethod: methodId,
      metadata,
    });
    return details.toPrimitives();
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<void> {
    const pi_ID = new PaymentIntentId(paymentIntentId);
    await this.paymentIntent.confirm(pi_ID);
  }
}
