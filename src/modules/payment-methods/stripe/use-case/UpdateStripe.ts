import { UniqId } from "@/src/common/domain/UniqId";
import { CardDetails } from "../domain/CardDetails";
import { IStripeRepo } from "../domain/interfaces/IStripeRepo";

export class UpdateStripe {
  constructor(private stripe: IStripeRepo) {}

  async saveCardDetails(params: {
    userId: UniqId;
    cardDetails: CardDetails;
  }): Promise<void> {
    await this.stripe.addNewCardDetails(params);
  }
}
