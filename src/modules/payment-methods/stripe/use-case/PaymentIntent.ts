import { ErrorCreatingPayment } from "@/src/domain/ErrorCreatingPayment";
import { CustomerId } from "../domain/CustomerId";
import { PaymentAmount } from "../domain/PaymentAmount";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class PaymentIntent {
  constructor(private stripe: StripePayments) {}

  async withoutPaymentMethod(
    customerId: CustomerId,
    amount: PaymentAmount
  ): Promise<string> {
    const clientSecret = await this.stripe.paymentIntentWithoutPaymentMethod(
      customerId,
      amount
    );
    if (!clientSecret)
      throw new ErrorCreatingPayment("Payment intent has failed");
    return clientSecret;
  }

  async withPaymentMethod(
    customerId: CustomerId,
    amount: PaymentAmount,
    paymentMethod: PaymentMethodId
  ): Promise<string> {
    const clientSecret = await this.stripe.paymentIntentWithPaymentMethod({
      customerId,
      amount,
      paymentMethod,
    });
    if (!clientSecret)
      throw new ErrorCreatingPayment("Payment intent has failed");
    return clientSecret;
  }
}
