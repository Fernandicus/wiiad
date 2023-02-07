import { UniqId } from "@/src/utils/UniqId";
import { Stripe } from "../Stripe";
import { CardDetails } from "../CardDetails";
import { PaymentMethodId } from "../value-objects/PaymentMethodId";

export interface IStripeRepo {
  save(stripe: Stripe): Promise<void>;
  findByUserId(userId: UniqId): Promise<Stripe>;
  removePM(params: { userId: UniqId; pm: PaymentMethodId }): Promise<void>;
  addNewCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void>;
}
