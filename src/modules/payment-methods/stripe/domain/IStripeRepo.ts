import { UniqId } from "@/src/utils/UniqId";
import { Stripe } from "../domain/Stripe";
import { PaymentMethodId } from "./PaymentMethodId";

export interface IStripeRepo {
  save(stripe: Stripe): Promise<void>;
  findByUserId(userId: UniqId): Promise<Stripe | null>;
  updatePaymentMethod(params: {
    userId: UniqId;
    paymentMethod: PaymentMethodId;
  }): Promise<void>;
}
