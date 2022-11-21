import { CustomerId } from "../domain/CustomerId";
import { Stripe } from "../domain/Stripe";
import { StripePayments } from "../infrastructure/StripePayments";

export class CreateStripeCustomer {
  constructor(private stripePayments: StripePayments) {}

  async create(): Promise<CustomerId> {
    return await this.stripePayments.createCustomer();
  }
}
