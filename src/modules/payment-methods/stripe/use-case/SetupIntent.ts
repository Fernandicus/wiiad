import { CustomerId } from "../domain/value-objects/CustomerId";
import { ISetupIntent, StripePayments } from "../infrastructure/StripePayments";

export class SetupIntent {
  constructor(private stripePayments: StripePayments) {}

  async create(customerId: CustomerId): Promise<ISetupIntent> {
    return await this.stripePayments.setupIntent(customerId);
  }
}
