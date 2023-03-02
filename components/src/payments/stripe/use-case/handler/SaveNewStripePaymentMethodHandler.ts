import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { SaveNewStripePaymentMethod } from "../SaveNewStripePaymentMethod";

export class SaveNewStripePaymentMethodHandler {
  constructor(private saveNewPM: SaveNewStripePaymentMethod) {}

  async save(paymentMethod: string): Promise<void> {
    const pm = new PaymentMethodId(paymentMethod);
    await this.saveNewPM.save(pm);
  }
}
