import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { IStripeApiCalls } from "../domain/interfaces/StripeApiCalls";

export class SaveNewStripePaymentMethod {
  constructor(private stripeApiCall: IStripeApiCalls) {}

  async save(paymentMethod: PaymentMethodId): Promise<void> {
    await this.stripeApiCall.saveNewPaymentMethod(paymentMethod);
  }
}
