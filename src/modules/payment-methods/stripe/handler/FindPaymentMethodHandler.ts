import { PaymentIntentId } from "../domain/PaymentIntentId";
import { FindPaymentMethod } from "../use-case/FindPaymentMethod";

export class FindPaymentMethodHandler {
  constructor(private findMethod: FindPaymentMethod) {}

  async fromPaymentIntent(paymentIntent: string): Promise<string> {
    const intent = new PaymentIntentId(paymentIntent);
    const method = await this.findMethod.fromPaymentIntent(intent);
    return method.id;
  }
}
