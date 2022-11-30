import { CustomerId } from "../domain/value-objects/CustomerId";
import { StripePayments } from "../infrastructure/StripePayments";

export class CreateStripeCustomer {
  constructor(private stripePayments: StripePayments) {}

  async create(): Promise<CustomerId> {
    return await this.stripePayments.createCustomer();
  }
}
