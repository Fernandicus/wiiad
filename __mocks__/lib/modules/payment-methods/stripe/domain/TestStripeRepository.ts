import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UniqId } from "@/src/common/domain/UniqId";

export interface TestStripeRepository {
  save(stripe: Stripe): Promise<void>;
  getByUserId(id: UniqId): Promise<Stripe | null>;
  getAllUsers(): Promise<Stripe[] | null>;
  saveMany(stripe: Stripe[]): Promise<void>;
}
