import { UniqId } from "@/src/utils/UniqId";
import { CardDetails } from "../domain/CardDetails";
import { IStripeRepo } from "../domain/IStripeRepo";
import { PaymentMethodId } from "../domain/value-objects/PaymentMethodId";
import { StripeMongoDBRepo } from "../infrastructure/StripeMongoDBRepo";

export class UpdateStripe {
  constructor(private stripe: IStripeRepo) {}

  async saveCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void> {
    const { userId, cardDetails } = params;
    await this.stripe.addNewCardDetails({ userId, cardDetails });
  }
}
