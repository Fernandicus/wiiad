import { UniqId } from "@/src/utils/UniqId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { UpdateStripe } from "../use-case/UpdateStripe";

export class UpdateStripeHandler {
  constructor(private updateStripe: UpdateStripe) {}

  async savePaymentMethod(
    userId: string,
    paymentMethod: string
  ): Promise<void> {
    const id = new UniqId(userId);
    const method = new PaymentMethodId(paymentMethod);
    await this.updateStripe.savePaymentMethod({
      userId: id,
      paymentMethod: method,
    });
  }
}
