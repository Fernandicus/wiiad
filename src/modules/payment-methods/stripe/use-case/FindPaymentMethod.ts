import { ErrorFindingPaymentMethod } from "../domain/ErrorFindingPaymentMethod";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class FindPaymentMethod {
  constructor(private stripePayment: StripePayments) {}

  async fromPaymentIntent(paymentIntent: PaymentIntentId):Promise<PaymentMethodId>{
   const method = await this.stripePayment.getPaymentMethodFromPaymentIntent(paymentIntent);
   if(!method) throw new ErrorFindingPaymentMethod("Payment intent not found");
   return method;
  }
}
