import { CreateStripeCustomer } from "../CreateStripeCustomer";

export class CreateStripeCustomerHandler {
  constructor(private createCustomer: CreateStripeCustomer) {}

  async create(): Promise<string> {
    const customerId = await this.createCustomer.create();
    return customerId.id;
  }
}
