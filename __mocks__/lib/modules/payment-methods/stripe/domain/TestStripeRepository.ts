import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UniqId } from "@/src/utils/UniqId";

export interface TestStripeRepository {
  save(stripe: Stripe): Promise<void>;
  getByUserId(id: UniqId): Promise<Stripe | null>;
}
