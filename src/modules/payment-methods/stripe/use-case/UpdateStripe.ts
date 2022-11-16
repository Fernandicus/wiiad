import { UniqId } from "@/src/utils/UniqId";
import { PaymentMethodId } from "../domain/PaymentMethodId";
import { StripeMongoDBRepo } from "../infrastructure/StripeMongoDBRepo";

export class UpdateStripe {
  constructor(private stripe: StripeMongoDBRepo) {}

  async savePaymentMethod(params: {
    userId: UniqId;
    paymentMethod: PaymentMethodId;
  }): Promise<void> {
    const { userId, paymentMethod } = params;
    await this.stripe.updatePaymentMethod({ userId, paymentMethod });
  }
}
