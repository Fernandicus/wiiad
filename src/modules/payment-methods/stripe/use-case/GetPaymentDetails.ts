import { CardDetails } from "../domain/CardDetails";
import { ErrorGettingPaymentDetails } from "../domain/ErrorGettingPaymentDetails";
import { PaymentDetails } from "../domain/PaymentDetails";
import { PaymentIntentId } from "../domain/PaymentIntentId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { StripePayments } from "../infrastructure/StripePayments";

export class GetPaymentDetails {
  constructor(private stripePayment: StripePayments) {}

  async fromPaymentIntent(id: PaymentIntentId):Promise<PaymentDetails>{
   const paymentIntentDetails = await this.stripePayment.getPaymentIntentDetails(id);
   if(!paymentIntentDetails) throw new ErrorGettingPaymentDetails("Payment intent not found");
   return paymentIntentDetails;
  }

  async fromPaymentMethod(id: PaymentMethodId):Promise<CardDetails>{
    const paymentMethodDetails = await this.stripePayment.getPaymentMethodDetails(id);
    if(!paymentMethodDetails) throw new ErrorGettingPaymentDetails("Payment method not found");
    return paymentMethodDetails;
   }
}
