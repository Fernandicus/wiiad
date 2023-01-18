import { UniqId } from "@/src/utils/UniqId";
import { Stripe } from "../Stripe";
import { CardDetails } from "../CardDetails";

export interface IStripeRepo {
  save(stripe: Stripe): Promise<void>;
  findByUserId(userId: UniqId): Promise<Stripe>;
  addNewCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void>;
}
