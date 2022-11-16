import { CustomerId } from "../domain/CustomerId";
import { PaymentAmount } from "../domain/PaymentAmount";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { PaymentIntent } from "../use-case/PaymentIntent";

export class PaymentIntentHandler {
  constructor(private paymentIntent: PaymentIntent) {}

  async withoutPaymentMethod(customerId: string, amount: number): Promise<string> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const clientSecret = await this.paymentIntent.withoutPaymentMethod(
      customer,
      totalAmount
    );
    return clientSecret;
  }

  async withPaymentMethod(customerId: string, amount: number, paymentMethodId:string): Promise<string> {
    const customer = new CustomerId(customerId);
    const totalAmount = new PaymentAmount(amount);
    const methodId = new PaymentMethodId(paymentMethodId);
    
    const clientSecret = await this.paymentIntent.withPaymentMethod(customer, totalAmount, methodId);
    return clientSecret;
  }
}
