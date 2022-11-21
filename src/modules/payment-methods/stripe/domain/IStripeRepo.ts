import { UniqId } from "@/src/utils/UniqId";
import { Stripe } from "../domain/Stripe";
import { CardDetails } from "./CardDetails";
import { PaymentMethodId } from "./value-objects/PaymentMethodId";

export interface IStripeRepo {
  save(stripe: Stripe): Promise<void>;
  findByUserId(userId: UniqId): Promise<Stripe | null>;
  addNewCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void>;
}
